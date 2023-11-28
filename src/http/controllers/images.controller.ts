import { NextFunction, Request, Response } from "express";
import ResponseUtil from "@/utils/response.util";
import { StatusCodes } from "http-status-codes";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";

class ImagesController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { resource, id } = req.params;
    const imagesResources = ["authors", "books"];

    if (!imagesResources.includes(resource)) {
      return ResponseUtil.sendError(
        res,
        "Invalid image resource",
        StatusCodes.NOT_FOUND,
      );
    }

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      resource,
      id,
    );

    if (!fs.existsSync(filePath)) {
      return ResponseUtil.sendError(
        res,
        "Image not found",
        StatusCodes.NOT_FOUND,
      );
    }

    try {
      const data = await fsPromises.readFile(filePath);

      return res
        .status(StatusCodes.OK)
        .set("Content-type", "image/jpeg")
        .send(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return ResponseUtil.sendError(
        res,
        "Error while reading image",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default new ImagesController();
