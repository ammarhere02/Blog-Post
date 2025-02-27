import { Controller, Post, Body, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signInDto } from "../Dto/auth-dto/signin.dto";
import { signUpDto } from "../Dto/auth-dto/signup.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/user/signin")
  async userSignIn(@Body() signInDto: signInDto) {
    const usercheck = await this.authService.signIn(signInDto, "user");
    return { message: "User logged in successfully", usercheck };
  }
  @Post("/admin/sigin")
  async adminSignIn(@Body() signInDto: signInDto) {
    const admincheck = await this.authService.signIn(signInDto, "admin");
    return { message: "Admin logged in successfully", admincheck };
  }
  @Post("register")
  async userSignUp(@Body() signUpDto: signUpDto) {
    await this.authService.signUp(signUpDto);
  }
}
