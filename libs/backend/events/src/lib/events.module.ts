import { Module } from '@nestjs/common';
import { EventsResolver } from './events.resolver';

@Module({
    imports: [],
    providers: [EventsResolver],
})
export class EventsModule {
    constructor() {
        console.log('EventsModule loaded', process.env['MONGO_DB_HOST']);
    }
}
