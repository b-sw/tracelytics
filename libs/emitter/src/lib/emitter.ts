import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';

export const useTracelytics = () => {
    const ENDPOINT = 'events';

    // TODO: timestamp for POC
    const emitEvent = (eventId: string, timestamp?: Dayjs) => {
        axios.post(`${ENDPOINT}/${eventId}`, { timestamp: timestamp ?? dayjs().toISOString() });
    };

    return { emitEvent };
};
