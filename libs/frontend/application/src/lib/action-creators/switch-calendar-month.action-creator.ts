import { SwitchDirection } from '@tracelytics/frontend/domain';
import { ActionCreator, Dispatcher } from '@tracelytics/shared/flux';
import { getMonthDays } from '@tracelytics/shared/utils';
import { inject, injectable } from 'inversify';
import { ChangeCalendarDaysAction, ChangeCalendarMonthAction, ChangeCalendarSwitchDirectionAction } from '../actions';
import { CalendarState } from '../states';

@injectable()
export class SwitchCalendarMonthActionCreator implements ActionCreator {
    constructor(
        @inject(Dispatcher) private readonly _dispatcher: Dispatcher,
        @inject(CalendarState) private readonly _calendarState: CalendarState,
    ) {}

    create(switchDirection: SwitchDirection): void {
        const monthDelta = switchDirection === SwitchDirection.Left ? -1 : 1;
        const newMonth = this._calendarState.currentMonth.add(monthDelta, 'month');
        const newDays = getMonthDays(newMonth);

        this._dispatcher.emit(new ChangeCalendarSwitchDirectionAction({ switchDirection }));
        this._dispatcher.emit(new ChangeCalendarMonthAction({ newMonth }));
        this._dispatcher.emit(new ChangeCalendarDaysAction({ newDays }));
    }
}
