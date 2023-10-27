import { TrackableEvent } from '@tracelytics/shared/types';

export type ChartStateModel = {
    eventColors: Map<TrackableEvent['id'], string>;
};
