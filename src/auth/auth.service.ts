import { Injectable, UnauthorizedException } from "@nestjs/common";
import { userService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as process from "node:process";
import * as bcrypt from "bcrypt";
import { signInDto } from "../Dto/auth-dto/signin.dto";
import { signUpDto } from "../Dto/auth-dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: userService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: signInDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(signInDto.username);
    console.log("user", user);
    if (!user) {
      throw new UnauthorizedException();
    }
    const comp_pass = await bcrypt.compare(signInDto.password, user.password);
    if (comp_pass) {
      const secretKey = process.env.SECRET;

      const payLoad = { username: signInDto.username };
      const accessToken = await this.jwtService.signAsync(payLoad, {
        secret: secretKey,
        expiresIn: "1h",
      });
      console.log(accessToken);
      return { accessToken };
    } else {
      throw new UnauthorizedException();
    }
  }

  async signUp(signUpDto: signUpDto) {
    const salt = await bcrypt.genSalt();

    const hashPass = await bcrypt.hash(signUpDto.password, salt);
    const user = await this.userService.postUser(
      signUpDto.username,
      signUpDto.email,
      hashPass,
    );

    console.log(user);
  }
}
