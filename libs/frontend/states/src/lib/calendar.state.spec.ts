import { SetCalendarDateRangeAction } from '@tracelytics/frontend/application';
import { createTestingModule } from '@tracelytics/shared/di';
import { Dispatcher } from '@tracelytics/shared/flux';
import dayjs from 'dayjs';
import 'reflect-metadata';
import { CalendarState } from './calendar.state';

describe('CalendarState', () => {
    let calendarState: CalendarState;
    let dispatcher: Dispatcher;

    beforeEach(() => {
        const testingContainer = createTestingModule({
            providers: [CalendarState, Dispatcher],
        });
        calendarState = testingContainer.get(CalendarState);
        dispatcher = testingContainer.get(Dispatcher);
    });

    it('date range is today by default', () => {
        expect(calendarState.dateRange).toEqual({
            start: dayjs().startOf('day'),
            end: dayjs().endOf('day'),
        });
    });

    it('pipes date range on init', () => {
        const dateRangeSpy = jest.fn();

        calendarState.dateRange$.subscribe(dateRangeSpy);

        expect(dateRangeSpy).toHaveBeenCalledTimes(1);
    });

    it('pipes date range on change', () => {
        const dateRangeSpy = jest.fn();
        const newDateRangeStub = { start: dayjs().startOf('day'), end: null };

        calendarState.dateRange$.subscribe(dateRangeSpy);
        dispatcher.emit(new SetCalendarDateRangeAction(newDateRangeStub));

        expect(dateRangeSpy).toHaveBeenNthCalledWith(2, newDateRangeStub);
    });
});
