import { SwitchDirection } from '@tracelytics/frontend/domain';
import { ActionCreator, Dispatcher } from '@tracelytics/shared/flux';
import { getMonthDays } from '@tracelytics/shared/utils';
import { Dayjs } from 'dayjs';
import { injectable } from 'inversify';
import { ChangeCalendarDaysAction, ChangeCalendarMonthAction, ChangeCalendarSwitchDirectionAction } from '../actions';

@injectable()
export class SwitchCalendarMonthActionCreator implements ActionCreator {
    constructor(private readonly dispatcher: Dispatcher) {}

    create(oldMonth: Dayjs, switchDirection: SwitchDirection): void {
        const monthDelta = switchDirection === SwitchDirection.Left ? -1 : 1;
        const newMonth = oldMonth.add(monthDelta, 'month');
        const newDays = getMonthDays(newMonth);

        this.dispatcher.emit(new ChangeCalendarSwitchDirectionAction({ switchDirection }));
        this.dispatcher.emit(new ChangeCalendarMonthAction({ newMonth }));
        this.dispatcher.emit(new ChangeCalendarDaysAction({ newDays }));
    }
}
