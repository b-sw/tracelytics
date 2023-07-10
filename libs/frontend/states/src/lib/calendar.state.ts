import dayjs, { Dayjs } from 'dayjs';
import { injectable } from 'inversify';

type DateRange = {
    start: Dayjs;
    end: Dayjs;
};

@injectable()
export class CalendarState {
    static readonly DEFAULT_STATE = {
        dateRange: {
            start: dayjs(),
            end: dayjs(),
        },
    };

    #dateRange: DateRange;

    constructor() {
        this.#dateRange = CalendarState.DEFAULT_STATE.dateRange;
    }

    get dateRange(): DateRange {
        return this.#dateRange;
    }
}
