import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcryptjs";
import { DBTable } from "@/constants/db-table";
import { Roles } from "@/constants/roles";
import { Common } from "@database/entities/common";

@Entity(DBTable.USERS)
export class User extends Common {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: Roles.USER })
  role: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }

  toResponse(): Partial<User> {
    const responseUser = new User();
    responseUser.id = this.id;
    responseUser.name = this.name;
    responseUser.email = this.email;
    responseUser.role = this.role;
    responseUser.createdAt = this.createdAt;
    responseUser.updatedAt = this.updatedAt;

    return responseUser;
  }
}
