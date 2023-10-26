import { TrackableEvent } from '.';

export type PeriodEvent = {
    id: TrackableEvent['id'];
    name: string;
    count: number;
};
