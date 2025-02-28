import { Injectable, UnauthorizedException } from "@nestjs/common";
import { userService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as process from "node:process";
import * as bcrypt from "bcrypt";
import { signInDto } from "./auth-dto/signin.dto";
import { signUpDto } from "./auth-dto/signup.dto";
import { prismaService } from "../../prisma/db";

@Injectable()
export class AuthService {
  constructor(
    private userService: userService,
    private jwtService: JwtService,
    private prisma: prismaService,
  ) {}

  async signIn(signInDto: signInDto): Promise<{ decodedToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { username: signInDto.username },
      select: {
        email: true,
        Role: true,
        password: true,
      },
    });
    if (!user) {
      console.log("User not found:", signInDto.username);
      throw new UnauthorizedException("User not found");
    }

    if (signInDto.role !== user.Role) {
      throw new UnauthorizedException();
    }
    console.log("Roles matched");
    const comp_pass = await bcrypt.compare(signInDto.password, user.password);
    console.log(user.password);
    if (comp_pass) {
      const secretKey = process.env.SECRET;
      const payLoad = {
        role: signInDto.role,
        username: signInDto.username,
      };
      const accessToken = await this.jwtService.signAsync(payLoad, {
        secret: secretKey,
        expiresIn: "1h",
      });
      console.log("Access Token", accessToken);
      const decodedToken: string = await this.jwtService.decode(accessToken);
      return { decodedToken };
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
