import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import {responseError} from "../error/response-error"

export const middlewareError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({ errors: error.message });
  }else if(error instanceof responseError){
    res.status(error.status).json({errors:error.message})
  }else{
    res.status(500).json({errors:error.message})
  }
};
