import { Module } from '@tracelytics/shared/di';
import { SelectCalendarDayActionCreator, SwitchCalendarMonthActionCreator } from './lib/action-creators';
import { CalendarState } from './lib/states';

@Module({
    imports: [],
    providers: [CalendarState, SwitchCalendarMonthActionCreator, SelectCalendarDayActionCreator],
})
export class ApplicationModule {}
