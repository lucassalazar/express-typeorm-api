import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DBTable } from "@/constants/db-table";
import { Author } from "@database/entities/author";
import { Common } from "@database/entities/common";
import ImageUtil from "@/utils/image.util";

@Entity(DBTable.BOOKS)
export class Book extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne((type) => Author, (author) => author.books, { eager: true })
  @JoinColumn({ name: "authorId" })
  author: Author;

  @Column()
  authorId: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  image: string;

  toPayload(): Partial<Book> {
    return {
      id: this.id,
      title: this.title,
      image: ImageUtil.prepareUrl("books", this.image),
      description: this.description,
      author: this.author.toPayload(),
      price: this.price,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
