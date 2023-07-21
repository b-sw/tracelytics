import { DateRange } from '@tracelytics/frontend/domain';
import { ActionCreator, Dispatcher } from '@tracelytics/shared/flux';
import { inject, injectable } from 'inversify';
import { ChangeCalendarSelectedDateRangeAction } from '../actions';
import { CalendarState } from '../states';

@injectable()
export class SelectCalendarDayActionCreator implements ActionCreator {
    constructor(
        @inject(Dispatcher) private readonly _dispatcher: Dispatcher,
        @inject(CalendarState) private readonly _calendarState: CalendarState,
    ) {}

    create(dateRange: DateRange): void {
        if (dateRange.start) {
            this._dispatcher.emit(new ChangeCalendarSelectedDateRangeAction({ newDateRange: dateRange }));
            return;
        }

        const newDateRange = {
            start: this._calendarState.selectedDateRange.start,
            end: dateRange.end,
        };

        this._dispatcher.emit(new ChangeCalendarSelectedDateRangeAction({ newDateRange }));
    }
}
