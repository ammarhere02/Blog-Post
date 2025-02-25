import { IsOptional, IsString } from "@nestjs/class-validator";

export class signUpDto {
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsOptional()
  phone?: number;
}
