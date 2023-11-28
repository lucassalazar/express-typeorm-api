import { Router } from "express";
import authRouter from "@/routes/auth.routes";
import authorsRouter from "@/routes/authors.routes";
import booksRouter from "@/routes/books.routes";
import healthRouter from "@/routes/health.routes";
import imagesRouter from "@/routes/images.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/authors", authorsRouter);
router.use("/books", booksRouter);
router.use("/health", healthRouter);
router.use("/images", imagesRouter);

export default router;
