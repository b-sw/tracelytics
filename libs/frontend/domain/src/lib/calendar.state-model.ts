import { Dayjs } from 'dayjs';
import { DateRange } from './date-range';

export enum SwitchDirection {
    Left = -1,
    Right = 1,
}

export type CalendarState = {
    switchDirection: SwitchDirection | null;
    selectedDateRange: DateRange;
    currentMonth: Dayjs;
    currentMonthDays: Dayjs[];
};
