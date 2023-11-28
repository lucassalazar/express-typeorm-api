import { DataSource } from "typeorm";
import { Author } from "@database/entities/author";
import { Book } from "@database/entities/book";
import { User } from "@database/entities/user";
import config from "@/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  logging: ["query"],
  synchronize: false,
  entities: [Author, Book, User],
  migrations: ["src/database/migrations/**/*.ts"],
  subscribers: ["src/database/subscribers/**/*.ts"],
});
