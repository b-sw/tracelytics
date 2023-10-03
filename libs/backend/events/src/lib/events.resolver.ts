import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateEventArgs } from './dto/create-event.args';
import { Event } from './event.model';
import { EventsService } from './events.service';

@Resolver(() => Event)
export class EventsResolver {
    constructor(private readonly eventsService: EventsService) {}

    @Mutation(() => Event)
    createUser(@Args() args: CreateEventArgs) {
        return this.eventsService.create(args);
    }

    @Query(() => Event)
    event(@Args('id') id: string): Promise<Event | null> {
        return this.eventsService.find(id);
    }

    @ResolveField('events', () => [Event])
    async getPosts() {
        return this.eventsService.findAll();
    }

    @Mutation(() => Event)
    removeEvent(@Args('id') id: string) {
        return this.eventsService.delete(id);
    }
}
