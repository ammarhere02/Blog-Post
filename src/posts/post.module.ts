import { Module } from "@nestjs/common";
import { prismaService } from "../../prisma/db";
import { postService } from "./post.service";
import { PostController } from "./post.controller";

@Module({
  controllers: [PostController],
  providers: [prismaService, postService],
  exports: [postService],
})
export class PostModule {}
