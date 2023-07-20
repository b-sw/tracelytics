import { Dayjs } from 'dayjs';

export const DATE_RANGE_FORMAT = 'YYYY-MM-DD';

export type DateRange = {
    start: Dayjs | null;
    end: Dayjs | null;
};
