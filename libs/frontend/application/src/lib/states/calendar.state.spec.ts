import { SwitchDirection } from '@tracelytics/frontend/domain';
import { createTestingModule } from '@tracelytics/shared/di';
import { getMonthDays } from '@tracelytics/shared/utils';
import dayjs from 'dayjs';
import 'reflect-metadata';
import { CalendarState } from './calendar.state';

describe('CalendarState', () => {
    let calendarState: CalendarState;

    beforeEach(() => {
        const testingContainer = createTestingModule({
            providers: [CalendarState],
        });
        calendarState = testingContainer.get(CalendarState);
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
        const newDateRangeStub = { start: dayjs().startOf('day'), end: dayjs().startOf('day') };
        calendarState.selectedDateRange$.subscribe(dateRangeSpy);

        calendarState.selectedDateRange = newDateRangeStub;

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

        calendarState.currentMonth = newMonthStub;

        expect(selectedMonthSpy).toHaveBeenCalledTimes(2);
        expect(selectedMonthSpy).toHaveBeenNthCalledWith(2, newMonthStub);
    });

    it('gets current month', () => {
        expect(calendarState.currentMonth).toEqual(dayjs().startOf('month'));
    });

    it('gets current month days', () => {
        // TODO: testing implementation
        expect(calendarState.currentMonthDays).toEqual(getMonthDays(dayjs()));
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

        calendarState.currentMonthDays = newDaysStub;
        expect(currentMonthDaysSpy).toHaveBeenCalledTimes(2);
        expect(currentMonthDaysSpy).toHaveBeenNthCalledWith(2, newDaysStub);
    });

    it('gets default switch direction', () => {
        expect(calendarState.switchDirection).toEqual(null);
    });

    it('gets changed switch direction', () => {
        const switchDirectionStub = SwitchDirection.Right;

        calendarState.switchDirection = switchDirectionStub;

        expect(calendarState.switchDirection).toEqual(switchDirectionStub);
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

        calendarState.switchDirection = switchDirectionStub;

        expect(switchDirectionSpy).toHaveBeenCalledTimes(2);
        expect(switchDirectionSpy).toHaveBeenNthCalledWith(2, switchDirectionStub);
    });
});
