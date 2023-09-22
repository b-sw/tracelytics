import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Event {
    @Field((type) => ID)
    id: string;

    @Field({ nullable: true })
    field1?: string;
}
