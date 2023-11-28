import * as dotenv from "dotenv";

dotenv.config();

const config = {
  APP_URL: String(process.env.APP_URL),
  APP_PORT: Number(process.env.APP_PORT),
  DB_HOST: String(process.env.DB_HOST),

  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: String(process.env.DB_USER),
  DB_PASSWORD: String(process.env.DB_PASSWORD),
  DB_DATABASE: String(process.env.DB_DATABASE),

  ACCESS_KEY_SECRET: String(process.env.ACCESS_KEY_SECRET),

  ADMIN_NAME: String(process.env.ADMIN_NAME),
  ADMIN_EMAIL: String(process.env.ADMIN_EMAIL),
  ADMIN_PASSWORD: String(process.env.ADMIN_PASSWORD),
  ADMIN_ROLE: Number(process.env.ADMIN_ROLE),
};

export default config;
