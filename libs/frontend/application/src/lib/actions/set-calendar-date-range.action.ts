import { DateRange } from '@tracelytics/frontend/domain';
import { DispatcherAction } from '@tracelytics/shared/flux';

export class SetCalendarDateRangeAction extends DispatcherAction {
    constructor(public override readonly payload: DateRange) {
        super(payload);
    }
}
