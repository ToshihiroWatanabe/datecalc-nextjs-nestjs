import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path/posix";
import { AppController } from "app.controller";
import { AppService } from "app.service";
import { FormulasResolver } from "formulas/formulas.resolver";
import { PrismaService } from "prisma.service";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, FormulasResolver],
})
export class AppModule {}
