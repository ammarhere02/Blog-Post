import { Module } from "@nestjs/common";
import { userService } from "./users.service";
import { UsersController } from "./users.controllers";
import { prismaService } from "../../prisma/db";

@Module({
  controllers: [UsersController],
  providers: [userService, prismaService],
  exports: [userService],
})
export class UsersModule {}
