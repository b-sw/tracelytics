import {
    ChangeCalendarDaysAction,
    ChangeCalendarMonthAction,
    ChangeCalendarSelectedDateRangeAction,
    ChangeCalendarSwitchDirectionAction,
} from '@tracelytics/frontend/application';
import { SwitchDirection } from '@tracelytics/frontend/domain';
import { createTestingModule } from '@tracelytics/shared/di';
import { Dispatcher } from '@tracelytics/shared/flux';
import { getMonthDays } from '@tracelytics/shared/utils';
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
        expect(calendarState.selectedDateRange).toEqual({
            start: dayjs().startOf('day'),
            end: dayjs().endOf('day'),
        });
    });

    it('pipes date range on init', () => {
        const dateRangeSpy = jest.fn();

        calendarState.selectedDateRange$.subscribe(dateRangeSpy);

        expect(dateRangeSpy).toHaveBeenCalledTimes(1);
    });

    it('pipes date range on change', () => {
        const dateRangeSpy = jest.fn();
        const newDateRangeStub = { start: dayjs().startOf('day'), end: null };

        calendarState.selectedDateRange$.subscribe(dateRangeSpy);
        dispatcher.emit(new ChangeCalendarSelectedDateRangeAction({ newDateRange: newDateRangeStub }));

        expect(dateRangeSpy).toHaveBeenNthCalledWith(2, newDateRangeStub);
    });

    it('pipes selected month on init', () => {
        const selectedMonthSpy = jest.fn();

        calendarState.currentMonth$.subscribe(selectedMonthSpy);

        expect(selectedMonthSpy).toHaveBeenCalledTimes(1);
        expect(selectedMonthSpy).toHaveBeenCalledWith(dayjs().startOf('month'));
    });

    it('pipes selected month on change', () => {
        const selectedMonthSpy = jest.fn();
        const newMonthStub = dayjs().add(1, 'month');

        calendarState.currentMonth$.subscribe(selectedMonthSpy);
        dispatcher.emit(new ChangeCalendarMonthAction({ newMonth: newMonthStub }));

        expect(selectedMonthSpy).toHaveBeenCalledTimes(2);
        expect(selectedMonthSpy).toHaveBeenNthCalledWith(2, newMonthStub);
    });

    it('gets current month', () => {
        expect(calendarState.currentMonth).toEqual(dayjs().startOf('month'));
    });

    it('pipes current month days on init', () => {
        const currentMonthDaysSpy = jest.fn();

        calendarState.currentMonthDays$.subscribe(currentMonthDaysSpy);

        expect(currentMonthDaysSpy).toHaveBeenCalledTimes(1);
        // TODO: testing implementation
        expect(currentMonthDaysSpy).toHaveBeenCalledWith(getMonthDays(dayjs()));
    });

    it('pipes current month days on change', () => {
        const currentMonthDaysSpy = jest.fn();
        // TODO: testing implementation
        const newDaysStub = getMonthDays(dayjs().add(1, 'month'));

        calendarState.currentMonthDays$.subscribe(currentMonthDaysSpy);
        dispatcher.emit(new ChangeCalendarDaysAction({ newDays: newDaysStub }));

        expect(currentMonthDaysSpy).toHaveBeenCalledTimes(2);
        expect(currentMonthDaysSpy).toHaveBeenNthCalledWith(2, newDaysStub);
    });

    it('pipes switch direction on init', () => {
        const switchDirectionSpy = jest.fn();

        calendarState.switchDirection$.subscribe(switchDirectionSpy);

        expect(switchDirectionSpy).toHaveBeenCalledTimes(1);
        expect(switchDirectionSpy).toHaveBeenCalledWith(null);
    });

    it('pipes switch direction on change', () => {
        const switchDirectionSpy = jest.fn();
        const switchDirectionStub = SwitchDirection.Right;

        calendarState.switchDirection$.subscribe(switchDirectionSpy);
        dispatcher.emit(new ChangeCalendarSwitchDirectionAction({ switchDirection: switchDirectionStub }));

        expect(switchDirectionSpy).toHaveBeenCalledTimes(2);
        expect(switchDirectionSpy).toHaveBeenNthCalledWith(2, switchDirectionStub);
    });
});
