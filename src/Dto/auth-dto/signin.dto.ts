import { IsString } from "@nestjs/class-validator";

export class signInDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
