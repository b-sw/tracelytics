import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackableEventSchema } from '../../../../shared/types/src/lib/schemas/trackable-event.schema';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { RegisteredEventSchema } from './registered-event.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'TrackableEvent', schema: TrackableEventSchema },
            { name: 'RegisteredEvent', schema: RegisteredEventSchema },
        ]),
    ],
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {
    constructor() {
        console.log('EventsModule loaded', process.env['MONGO_DB_HOST']);
    }
}
