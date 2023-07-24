import { DispatcherAction } from '@tracelytics/shared/flux';
import { Dayjs } from 'dayjs';

export class ChangeTemporaryDateRangeEndAction extends DispatcherAction {
    constructor(public override readonly payload: { newEnd: Dayjs | null }) {
        super(payload);
    }
}
