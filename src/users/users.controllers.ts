import { userService } from "./users.service";
import { Controller, Get, Param, Body, Put, Delete } from "@nestjs/common";

@Controller("users")
export class UsersController {
  constructor(private userService: userService) {}
  @Get()
  findAllUsers() {
    console.log("Finding users");
    return this.userService.findALl();
  }

  @Put(":id")
  updateUser(
    @Param("id") id: string,
    @Body("username") username: string,
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    const modId = parseInt(id);
    return this.userService.Update(modId, username, email, password);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: number) {
    return this.userService.DeleteOne(id);
  }
}
