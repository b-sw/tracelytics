import { TrackableEvent } from '.';

export type PeriodEvent = {
    id: TrackableEvent['id'];
    name: string;
    counts: {
        [date: string]: number;
    };
    totalCount: number;
};
