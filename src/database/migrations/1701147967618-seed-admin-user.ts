import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "@database/data-source";
import { User } from "@database/entities/user";
import config from "@/config";

export class SeedAdminUser1701147967618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = AppDataSource.getRepository(User);
    const userData = new User();
    userData.email = config.ADMIN_EMAIL;
    userData.name = config.ADMIN_NAME;
    userData.role = config.ADMIN_ROLE;
    userData.password = config.ADMIN_PASSWORD;

    const user = repo.create(userData);
    await repo.save(user);
    console.info("Done.");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOneBy({
      email: config.ADMIN_EMAIL,
    });

    if (user) {
      await repo.remove(user);
    }
  }
}
