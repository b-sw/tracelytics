import { DateRange } from '@tracelytics/frontend/domain';
import { DispatcherAction } from '@tracelytics/shared/flux';

export class ChangeCalendarSelectedDateRangeAction extends DispatcherAction {
    constructor(public override readonly payload: { newDateRange: DateRange }) {
        super();
    }
}
