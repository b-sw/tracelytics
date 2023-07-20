import { Module } from '@tracelytics/shared/di';
import { CalendarState } from './lib/calendar.state';

@Module({
    imports: [],
    providers: [CalendarState],
})
export class StatesModule {}
