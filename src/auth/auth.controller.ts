import { Controller, Post, Body, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signInDto } from "./auth-dto/signin.dto";
import { signUpDto } from "./auth-dto/signup.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signin")
  async userSignIn(@Body() signInDto: signInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post("register")
  async userSignUp(@Body() signUpDto: signUpDto) {
    await this.authService.signUp(signUpDto);
  }
}
