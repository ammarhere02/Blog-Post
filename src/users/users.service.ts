import { Injectable } from "@nestjs/common";
import { prismaService } from "../../prisma/db";

@Injectable()
export class userService {
  constructor(private prismaService: prismaService) {}

  // real data testing using database
  async findALl() {
    const retrieving_users = await this.prismaService.user.findMany();
    console.log(retrieving_users);
    return retrieving_users;
  }

  async postUser(username: string, email: string, password: string) {
    try {
      const postingUser = await this.prismaService.user.create({
        data: {
          username: username,
          email: email,
          password: password,
        },
      });

      return { message: "User created successfully", user: postingUser };
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async Update(id: number, username: string, email: string, password: string) {
    const updateUser = await this.prismaService.user.updateMany({
      where: { id },
      data: {
        username,
        email,
        password,
      },
    });
    console.log("User updated successfully", updateUser);
  }

  async DeleteOne(id: number) {
    const deleteUser = await this.prismaService.user.delete({
      where: { id },
    });

    console.log(`User deleted successfully with ${id}`, deleteUser);
  }
}
