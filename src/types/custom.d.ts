import { Request } from "express";
import { User } from "@database/entities/user";

export interface AuthenticatedRequest extends Request {
  user?: User;
}
