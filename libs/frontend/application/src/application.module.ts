import { Module } from '@tracelytics/shared/di';
import { CalendarState } from './lib/states';

@Module({
    imports: [],
    providers: [CalendarState],
})
export class ApplicationModule {}
