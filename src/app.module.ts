import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./posts/post.module";
import { UsersModule } from "./users/users.module";
import * as dotenv from "dotenv";

dotenv.config();
@Module({
  imports: [AuthModule, UsersModule, PostModule],
})
export class AppModule {}
