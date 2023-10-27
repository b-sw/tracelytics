import { Module } from '@tracelytics/shared/di';
import { CalendarState, ChartState } from './lib/states';

@Module({
    imports: [],
    providers: [CalendarState, ChartState],
})
export class ApplicationModule {}
