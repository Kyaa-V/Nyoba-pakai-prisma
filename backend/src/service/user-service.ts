import {
  createUser,
  responseUser,
  toUserResponse,
  loginUser,
} from "../modul/userModul";
import { userValidation } from "../validation/user-validation";
import { VALIDATION } from "../validation/validation";
import { prismaClient } from "../application/database";
import { responseError } from "../error/response-error";

export class userService {
  static async register(request: createUser): Promise<responseUser> {
    const registerUser = await VALIDATION.validation(
      userValidation.REGISTER,
      request
    );

    const countUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerUser.username,
      },
    });
    if (countUserWithSameUsername != 0) {
      throw new responseError(400, "user already exist");
    }
    const user = prismaClient.user.create({
      data: registerUser,
    });
    return toUserResponse(user);
  }

  static async login(request: loginUser): Promise<responseUser> {
    const validasiLogin = await VALIDATION.validation(
      userValidation.LOGIN,
      request
    );

    const user = await prismaClient.user.findFirst({
      where: {
        email: validasiLogin.email,
      },
    });

    if (!user) {
      throw new responseError(401, "email atau password anda salah");
    }
    if (validasiLogin.password != user.password) {
      throw new responseError(401, "email atau password anda salah");
    }
    
    const token =
    jwt.sign({username:user.username,email:user.email},"secretkey",{expiresIn:"30d"})
    
    await prismaClient.user.update({
      where: {
        email: validasiLogin.email,
      },
      data: {
        token: token,
      },
    });
    const userResponse = toUserResponse(user);
    userResponse.token = token;
    return userResponse;
  }
}
