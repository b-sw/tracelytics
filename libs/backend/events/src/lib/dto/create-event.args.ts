import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateEventArgs {
    @Field()
    name: string;

    @Field()
    timestamp: string;
}
