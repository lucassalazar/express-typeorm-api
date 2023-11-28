import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Common {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
