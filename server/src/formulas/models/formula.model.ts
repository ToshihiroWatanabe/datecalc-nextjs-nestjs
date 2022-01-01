import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Formula {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  addYear: number;
  addMonth: number;
  addDay: number;
}
