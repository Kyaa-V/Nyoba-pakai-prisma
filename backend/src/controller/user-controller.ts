import { Request, Response, NextFunction } from "express";
import { createUse, loginUserr } from "../modul/userModul";
import { userService } from "../service/user-service";

export class userController {
  static register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: createUser = req.body as createUser;
      const user = userService.register(request);
      res.status(201).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
  static login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: loginUserr = req.body as loginUserr;
      const user = userService.login(request);
      res.status(201).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
}
