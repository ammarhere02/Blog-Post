import { IsString, IsNumber } from "@nestjs/class-validator";

// id        Int     @id @default(autoincrement())
// title     String
// content   String?
// published Boolean @default(false)
// authorId  Int
export class createPost {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  published: string;
  @IsNumber()
  authorId: number;
}
