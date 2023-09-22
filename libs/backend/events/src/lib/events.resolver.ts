import { Query, Resolver } from '@nestjs/graphql';
import { Event } from './events.model';

@Resolver(of => Event)
export class EventsResolver {
    @Query(returns => Event)
    sayHello(): string {
        return 'Hello World!';
    }
}
