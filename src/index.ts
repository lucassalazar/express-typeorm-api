import app from "@/app";
import { AppDataSource } from "@database/data-source";
import "reflect-metadata";
import config from "@/config";

const { APP_PORT: PORT } = config;

AppDataSource.initialize()
  .then(async () => {
    console.log(`Database was connected successfully.`);
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
