import { DispatcherAction } from '@tracelytics/shared/flux';
import { Dayjs } from 'dayjs';

export class ChangeCalendarMonthAction extends DispatcherAction {
    constructor(public override readonly payload: { newMonth: Dayjs }) {
        super(payload);
    }
}
