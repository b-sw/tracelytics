import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Event {
    @Field(() => ID, { description: 'Event ID' })
    id: string;

    @Field({ description: 'Event name' })
    name: string;

    @Field({ description: 'Event timestamp' })
    timestamp: string;
}
