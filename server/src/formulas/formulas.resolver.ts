import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "prisma.service";
import { Formula } from "formulas/models/formula.model";

@Resolver(() => Formula)
export class FormulasResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Formula])
  async formulas() {
    return this.prisma.formula.findMany();
  }

  @Mutation(() => Formula)
  async createFormula(
    @Args("name") name: string,
    @Args("addYear") addYear: number,
    @Args("addMonth") addMonth: number,
    @Args("addDay") addDay: number,
  ) {
    return this.prisma.formula.create({
      data: { name, addYear, addMonth, addDay },
    });
  }

  @Mutation(() => Formula)
  async updateFormula(
    @Args("id") id: number,
    @Args("name") name: string,
    @Args("addYear") addYear: number,
    @Args("addMonth") addMonth: number,
    @Args("addDay") addDay: number,
  ) {
    return this.prisma.formula.update({
      data: { name, addYear, addMonth, addDay },
      where: {
        id: id,
      },
    });
  }

  @Mutation(() => Formula)
  async deleteFormula(@Args("id") id: number) {
    return this.prisma.formula.delete({
      where: {
        id: id,
      },
    });
  }
}
