import { SetCalendarDateRangeAction } from '@tracelytics/frontend/application';
import { CalendarState as CalendarStateModel, DateRange } from '@tracelytics/frontend/domain';
import { Dispatcher } from '@tracelytics/shared/flux';
import dayjs from 'dayjs';
import { injectable } from 'inversify';
import { BehaviorSubject, Observable } from 'rxjs';

@injectable()
export class CalendarState implements CalendarStateModel {
    static readonly DEFAULT_STATE = {
        dateRange: {
            start: dayjs().startOf('day'),
            end: dayjs().endOf('day'),
        },
    };

    #dateRange$ = new BehaviorSubject<DateRange>(CalendarState.DEFAULT_STATE.dateRange);

    constructor(private readonly _dispatcher: Dispatcher) {
        this.#dateRange$.next(CalendarState.DEFAULT_STATE.dateRange);
        this._dispatcher.on(SetCalendarDateRangeAction).subscribe((action) => {
            this.#dateRange$.next(action.payload);
        });
    }

    get dateRange(): DateRange {
        return this.#dateRange$.getValue();
    }

    get dateRange$(): Observable<DateRange> {
        return this.#dateRange$.asObservable();
    }
}
