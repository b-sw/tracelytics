import { Dayjs } from 'dayjs';
import { Observable } from 'rxjs';
import { DateRange } from './date-range';

export enum SwitchDirection {
    Left = -1,
    Right = 1,
}

export interface CalendarState {
    selectedDateRange: DateRange;
    selectedDateRange$: Observable<DateRange>;
    currentMonth: Dayjs;
    currentMonth$: Observable<Dayjs>;
    currentMonthDays$: Observable<Dayjs[]>;
}
