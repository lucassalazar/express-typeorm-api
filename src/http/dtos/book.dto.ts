import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { IsUnique } from "@http/validators/is-unique.validator";
import { IsValid } from "@http/validators/is-valid.validator";
import { Book } from "@database/entities/book";
import { Author } from "@database/entities/author";

export class CreateBookDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsUnique(Book, "title")
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsValid(Author, "id")
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;
}

export class UpdateBookDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsUnique(Book, "title")
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsValid(Author, "id")
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;
}
