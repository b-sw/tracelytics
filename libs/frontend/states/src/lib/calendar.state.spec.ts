import dayjs from 'dayjs';
import 'reflect-metadata';
import { CalendarState } from './calendar.state';

describe('CalendarState', () => {
    it('date range is today by default', () => {
        const state = new CalendarState();

        expect(state.dateRange).toEqual({
            start: dayjs(),
            end: dayjs(),
        });
    });
});
