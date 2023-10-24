import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event.schema';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {
    constructor() {
        console.log('EventsModule loaded', process.env['MONGO_DB_HOST']);
    }
}
