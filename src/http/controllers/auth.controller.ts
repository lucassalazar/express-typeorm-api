import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "@http/dtos/auth.dto";
import { validateOrReject } from "class-validator";
import { AppDataSource } from "@database/data-source";
import { User } from "@database/entities/user";
import ResponseUtil from "@/utils/response.util";
import { StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";
import config from "@/config";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const registerData = req.body;

    const dto = new RegisterDTO();
    dto.name = registerData.name;
    dto.email = registerData.email;
    dto.password = registerData.password;

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(User);
    const user = repo.create(dto);
    await repo.save(user);

    return ResponseUtil.sendResponse<User>(
      res,
      "Successfully registered new user",
      user,
      StatusCodes.CREATED,
    );
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const loginData = req.body;

    const dto = new LoginDTO();
    Object.assign(dto, loginData);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email: dto.email });

    if (!user) {
      return ResponseUtil.sendError(
        res,
        "Invalid credentials",
        StatusCodes.UNAUTHORIZED,
      );
    }

    const passwordMatches = await compare(dto.password, user.password);

    if (!passwordMatches) {
      return ResponseUtil.sendError(
        res,
        "Invalid credentials",
        StatusCodes.UNAUTHORIZED,
      );
    }

    const accessToken = sign({ userId: user.id }, config.ACCESS_KEY_SECRET, {
      expiresIn: "30m", // 30 minutes
    });

    const formattedUser: Partial<User> = user.toResponse();

    return ResponseUtil.sendResponse(res, "Successful login", {
      user: formattedUser,
      accessToken,
    });
  }
}

export default new AuthController();
