import { postService } from "./post.service";
import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Post,
} from "@nestjs/common";
import { createPost } from "../Dto/post-dto/create.post.dto";

@Controller("post")
export class PostController {
  constructor(private postService: postService) {}

  @Get()
  async getPosts() {
    return this.postService.getAllPosts();
  }
  @Get(":id")
  getPostsById(@Param("id") params: string) {
    return this.postService.getPostById(params);
  }
  @Post()
  async creatingPost(@Body() createPost: createPost) {
    return this.postService.createPost(createPost);
  }

  @Put(":id")
  async updatingPost(@Param("id") id: string, @Body() createPost: createPost) {
    return this.postService.UpdatePost(id, createPost);
  }

  @Delete(":id")
  async deletingPost(@Param("id") id: string) {
    return this.postService.deletePost(id);
  }
}
