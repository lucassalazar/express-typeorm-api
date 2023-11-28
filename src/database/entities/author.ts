import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DBTable } from "@/constants/db-table";
import { Book } from "@database/entities/book";
import ImageUtil from "@/utils/image.util";
import { Common } from "@database/entities/common";

@Entity(DBTable.AUTHORS)
export class Author extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany((type) => Book, (book) => book.author)
  books: Book[];

  toPayload(): Author {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      bio: this.bio,
      image: ImageUtil.prepareUrl("authors", this.image),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    } as Author;
  }
}
