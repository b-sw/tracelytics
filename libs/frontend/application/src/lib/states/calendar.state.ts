import { CalendarState as CalendarStateModel } from '@tracelytics/frontend/domain';
import { Dispatcher } from '@tracelytics/shared/flux';
import { getMonthDays } from '@tracelytics/shared/utils';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import {
    ChangeCalendarDaysAction,
    ChangeCalendarMonthAction,
    ChangeCalendarSelectedDateRangeAction,
    ChangeCalendarSwitchDirectionAction,
} from '../actions';
import { State } from './state';

@injectable()
export class CalendarState extends State<CalendarStateModel> {
    static readonly DEFAULT_STATE: CalendarStateModel = {
        switchDirection: null,
        selectedDateRange: {
            start: null,
            end: null,
        },
        currentMonth: dayjs().startOf('month'),
        currentMonthDays: getMonthDays(dayjs()),
        isSelecting: false,
    };

    constructor(@inject(Dispatcher) private readonly _dispatcher: Dispatcher) {
        super(CalendarState.DEFAULT_STATE);

        this._dispatcher.on(ChangeCalendarSwitchDirectionAction).subscribe(action => {
            this.setPartialState({ switchDirection: action.payload.switchDirection });
        });
        this._dispatcher.on(ChangeCalendarSelectedDateRangeAction).subscribe(action => {
            this.setPartialState({ selectedDateRange: action.payload.newDateRange });
        });
        this._dispatcher.on(ChangeCalendarMonthAction).subscribe(action => {
            this.setPartialState({ currentMonth: action.payload.newMonth });
        });
        this._dispatcher.on(ChangeCalendarDaysAction).subscribe(action => {
            this.setPartialState({ currentMonthDays: action.payload.newDays });
        });
    }
}
