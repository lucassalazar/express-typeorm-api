import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { StatusCodes } from "http-status-codes";
import ResponseUtil from "@/utils/response.util";
import { Paginator } from "@database/paginator";
import { CreateBookDTO, UpdateBookDTO } from "@http/dtos/book.dto";
import { validateOrReject } from "class-validator";
import { Book } from "@database/entities/book";

class BooksController {
  async getAll(req: Request, res: Response): Promise<Response> {
    const builder = await AppDataSource.getRepository(Book)
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.author", "author")
      .orderBy("book.id", "ASC");

    const { records: books, paginationInfo } = await Paginator.paginate(
      builder,
      req,
    );

    const bookData = books.map((book: Book) => {
      return book.toPayload();
    });

    return ResponseUtil.sendResponse<Partial<Book>>(
      res,
      "Fetched books successfully",
      bookData,
      StatusCodes.OK,
      paginationInfo,
    );
  }

  async get(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const book = await AppDataSource.getRepository(Book).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtil.sendResponse<Partial<Book>>(
      res,
      "Fetched book successfully",
      book.toPayload(),
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const bookData = req.body;
    bookData.image = req.file?.filename;

    const dto = new CreateBookDTO();
    Object.assign(dto, bookData);
    dto.price = parseInt(bookData.price);
    dto.authorId = parseInt(bookData.authorId);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Book);
    const book = repo.create(dto);

    await repo.save(book);

    return ResponseUtil.sendResponse<Partial<Book>>(
      res,
      "Successfully created new book",
      book.toPayload(),
      StatusCodes.CREATED,
    );
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const bookData = req.body;
    console.log("ENTROU!", bookData);

    const dto = new UpdateBookDTO();
    Object.assign(dto, bookData);

    dto.id = parseInt(id);
    dto.price = parseInt(bookData.price);
    dto.authorId = parseInt(bookData.authorId);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Book);
    const book = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(book, dto);
    await repo.save(book);

    return ResponseUtil.sendResponse<Partial<Book>>(
      res,
      "Successfully updated the book",
      book.toPayload(),
    );
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repo = AppDataSource.getRepository(Book);
    const book = await repo.findOneByOrFail({
      id: Number(id),
    });

    await repo.remove(book);

    return ResponseUtil.sendResponse<Partial<Book>>(
      res,
      "Successfully deleted the book",
      book.toPayload(),
    );
  }
}

export default new BooksController();
