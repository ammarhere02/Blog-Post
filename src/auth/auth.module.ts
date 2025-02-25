import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import * as process from "node:process";
import { userService } from "../users/users.service";
import { prismaService } from "../../prisma/db";

@Module({
  providers: [AuthService, userService, prismaService],

  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: "1m" },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
