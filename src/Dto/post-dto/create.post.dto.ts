import { IsString, IsNumber, IsBoolean } from "@nestjs/class-validator";

export class createPost {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsBoolean()
  published: boolean;
  @IsNumber()
  authorId: number;
}
