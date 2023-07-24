import { DispatcherAction } from '@tracelytics/shared/flux';
import { Dayjs } from 'dayjs';

export class ChangeCalendarDaysAction extends DispatcherAction {
    constructor(public override readonly payload: { newDays: Dayjs[] }) {
        super(payload);
    }
}
