import { CalendarState as CalendarStateModel, SwitchDirection } from '@tracelytics/frontend/domain';
import { getMonthDays } from '@tracelytics/shared/utils';
import dayjs from 'dayjs';
import { injectable } from 'inversify';
import { State } from './state';

@injectable()
export class CalendarState extends State<CalendarStateModel> {
    static readonly DEFAULT_STATE: CalendarStateModel = {
        switchDirection: null,
        selectedDateRange: {
            start: dayjs().startOf('day'),
            end: dayjs().endOf('day'),
        },
        currentMonth: dayjs().startOf('month'),
        currentMonthDays: getMonthDays(dayjs()),
        isSelecting: false,
    };

    public switchMonth(switchDirection: SwitchDirection): void {
        const monthDelta = switchDirection === SwitchDirection.Left ? -1 : 1;
        const newMonth = this.currentMonth.add(monthDelta, 'month');
        const newDays = getMonthDays(newMonth);

        this.setPartialState({ switchDirection, currentMonth: newMonth, currentMonthDays: newDays });
    }

    constructor() {
        super(CalendarState.DEFAULT_STATE);
    }
}
