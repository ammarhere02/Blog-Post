import { PrismaClient } from "@prisma/client";
import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";

export class prismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log("Connection successful");
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    console.log("Connection destroyed");
  }
}
