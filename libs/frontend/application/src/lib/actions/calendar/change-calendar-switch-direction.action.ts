import { SwitchDirection } from '@tracelytics/frontend/domain';
import { DispatcherAction } from '@tracelytics/shared/flux';

export class ChangeCalendarSwitchDirectionAction extends DispatcherAction {
    constructor(public override readonly payload: { switchDirection: SwitchDirection }) {
        super();
    }
}
