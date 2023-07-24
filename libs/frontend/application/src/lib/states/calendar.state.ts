import { CalendarState as CalendarStateModel, DateRange, SwitchDirection } from '@tracelytics/frontend/domain';
import { Dispatcher } from '@tracelytics/shared/flux';
import { getMonthDays } from '@tracelytics/shared/utils';
import dayjs, { Dayjs } from 'dayjs';
import { inject, injectable } from 'inversify';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    ChangeCalendarDaysAction,
    ChangeCalendarMonthAction,
    ChangeCalendarSelectedDateRangeAction,
    ChangeCalendarSwitchDirectionAction,
    ChangeTemporaryDateRangeEndAction,
} from '../actions';

@injectable()
export class CalendarState implements CalendarStateModel {
    static readonly DEFAULT_STATE = {
        switchDirection: null,
        dateRange: {
            start: null,
            end: null,
        },
        currentMonth: dayjs().startOf('month'),
        currentMonthDays: getMonthDays(dayjs()),
        temporaryDateRangeEnd: null,
    };

    #switchDirection$ = new BehaviorSubject<SwitchDirection | null>(CalendarState.DEFAULT_STATE.switchDirection);
    #selectedDateRange$ = new BehaviorSubject<DateRange>(CalendarState.DEFAULT_STATE.dateRange);
    #currentMonth$ = new BehaviorSubject<Dayjs>(CalendarState.DEFAULT_STATE.currentMonth);
    #currentMonthDays$ = new BehaviorSubject<Dayjs[]>(CalendarState.DEFAULT_STATE.currentMonthDays);
    #temporaryDateRangeEnd$ = new BehaviorSubject<Dayjs | null>(CalendarState.DEFAULT_STATE.temporaryDateRangeEnd);

    constructor(@inject(Dispatcher) private readonly _dispatcher: Dispatcher) {
        this._dispatcher.on(ChangeCalendarSwitchDirectionAction).subscribe((action) => {
            this.#switchDirection$.next(action.payload.switchDirection);
        });
        this._dispatcher.on(ChangeCalendarSelectedDateRangeAction).subscribe((action) => {
            this.#selectedDateRange$.next(action.payload.newDateRange);
        });
        this._dispatcher.on(ChangeCalendarMonthAction).subscribe((action) => {
            this.#currentMonth$.next(action.payload.newMonth);
        });
        this._dispatcher.on(ChangeCalendarDaysAction).subscribe((action) => {
            this.#currentMonthDays$.next(action.payload.newDays);
        });
        this._dispatcher.on(ChangeTemporaryDateRangeEndAction).subscribe((action) => {
            this.#temporaryDateRangeEnd$.next(action.payload.newEnd);
        });
    }

    get switchDirection(): SwitchDirection | null {
        return this.#switchDirection$.getValue();
    }

    get switchDirection$(): Observable<SwitchDirection | null> {
        return this.#switchDirection$.asObservable();
    }

    get selectedDateRange(): DateRange {
        return this.#selectedDateRange$.getValue();
    }

    get selectedDateRange$(): Observable<DateRange> {
        return this.#selectedDateRange$.asObservable();
    }

    get currentMonth(): Dayjs {
        return this.#currentMonth$.getValue();
    }

    get currentMonth$(): Observable<Dayjs> {
        return this.#currentMonth$.asObservable();
    }

    get currentMonthDays(): Dayjs[] {
        return this.#currentMonthDays$.getValue();
    }

    get currentMonthDays$(): Observable<Dayjs[]> {
        return this.#currentMonthDays$.asObservable();
    }

    get temporaryDateRangeEnd(): Dayjs | null {
        return this.#temporaryDateRangeEnd$.getValue();
    }

    get temporaryDateRangeEnd$(): Observable<Dayjs | null> {
        return this.#temporaryDateRangeEnd$.asObservable();
    }
}
