import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signInDto } from "../Dto/auth-dto/signin.dto";
import { signUpDto } from "../Dto/auth-dto/signup.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signin")
  async userSignIn(@Body() signInDto: signInDto) {
    const user = await this.authService.signIn(signInDto);
    return { message: "User logged in successfully", user };
  }

  @Post("register")
  async userSignUp(@Body() signUpDto: signUpDto) {
    await this.authService.signUp(signUpDto);
  }
}
