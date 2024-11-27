import express from "express";
import { userController } from "../controller/user-controller";

export const publicRouter = express.Router();
publicRouter.post("/users", userController.register);
publicRouter.post("/users", userController.login);
