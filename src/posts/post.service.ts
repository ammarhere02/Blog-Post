import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { prismaService } from "../../prisma/db";
import { createPost } from "./post-dto/create.post.dto";

@Injectable()
export class postService {
  constructor(private prismaService: prismaService) {}

  async getAllPosts() {
    const gettingPosts = await this.prismaService.post.findMany();
    console.log("All posts" + JSON.stringify(gettingPosts));
  }

  async createPost(payload: createPost) {
    console.log(payload);
    const creatingPost = await this.prismaService.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        published: payload.published,
        authorId: payload.authorId,
      },
    });

    if (!creatingPost) {
      throw new UnauthorizedException();
    } else {
      return creatingPost;
    }
  }

  async getPostById(id: string) {
    const convtID = parseInt(id);
    const postById = await this.prismaService.post.findUnique({
      where: { id: convtID },
    });
    if (!postById) {
      throw new UnauthorizedException();
    } else {
      console.log(postById);
    }
  }

  async UpdatePost(id: string, createP: createPost) {
    try {
      const convID = parseInt(id);
      const updatePost = await this.prismaService.post.updateMany({
        where: { id: convID },
        data: {
          title: createP.title,
          content: createP.content,
          published: createP.published,
          authorId: createP.authorId,
        },
      });

      console.log("Post updated Successfully", updatePost);
    } catch {
      throw new Error("error in updating the data");
    }
  }

  async deletePost(id: string) {
    try {
      const convID = parseInt(id);
      if (isNaN(convID)) throw new NotFoundException("Invalid post ID");

      const deletedPost = await this.prismaService.post.delete({
        where: { id: convID },
      });

      console.log("Post deleted successfully", deletedPost);
    } catch {
      throw new Error("Failed to delete the user");
    }
  }
}
