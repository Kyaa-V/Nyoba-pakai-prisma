import { ZodType } from "zod";

export class VALIDATION {
  static validation<T>(schema: ZodType, request: T): T {
    return schema.parse(request);
  }
}

