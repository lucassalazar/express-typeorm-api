import { Request, Response } from "express";
import { AppDataSource } from "@database/data-source";
import { Author } from "@database/entities/author";
import { StatusCodes } from "http-status-codes";
import ResponseUtil from "@/utils/response.util";
import { Paginator } from "@database/paginator";
import { CreateAuthorDTO, UpdateAuthorDTO } from "@http/dtos/author.dto";
import { validateOrReject } from "class-validator";

class AuthorsController {
  async getAll(req: Request, res: Response): Promise<Response> {
    const builder = await AppDataSource.getRepository(Author)
      .createQueryBuilder()
      .orderBy("id", "ASC");

    const { records: authors, paginationInfo } = await Paginator.paginate(
      builder,
      req,
    );

    const authorData = authors.map((author: Author) => {
      return author.toPayload();
    });

    return ResponseUtil.sendResponse<Author>(
      res,
      "Fetched authors successfully",
      authorData,
      StatusCodes.OK,
      paginationInfo,
    );
  }

  async get(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtil.sendResponse<Author>(
      res,
      "Fetched author successfully",
      author.toPayload(),
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const authorData = req.body;
    authorData.image = req.file?.filename;

    const dto = new CreateAuthorDTO();
    Object.assign(dto, authorData);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Author);
    const author = repo.create(dto);

    await repo.save(author);

    return ResponseUtil.sendResponse<Author>(
      res,
      "Successfully created new author",
      author.toPayload(),
      StatusCodes.CREATED,
    );
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const authorData = req.body;

    const dto = new UpdateAuthorDTO();
    Object.assign(dto, authorData);
    dto.id = parseInt(id);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Author);
    const author = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(author, dto);
    await repo.save(author);

    return ResponseUtil.sendResponse<Author>(
      res,
      "Successfully updated the author",
      author.toPayload(),
    );
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repo = AppDataSource.getRepository(Author);
    const author = await repo.findOneByOrFail({
      id: Number(id),
    });

    await repo.remove(author);

    return ResponseUtil.sendResponse<Author>(
      res,
      "Successfully deleted the author",
      author.toPayload(),
    );
  }
}

export default new AuthorsController();
