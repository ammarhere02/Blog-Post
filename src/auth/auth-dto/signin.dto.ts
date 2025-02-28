import { IsOptional, IsString } from "@nestjs/class-validator";

export class signInDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsOptional()
  email: string;
  @IsOptional()
  role: string;
}
