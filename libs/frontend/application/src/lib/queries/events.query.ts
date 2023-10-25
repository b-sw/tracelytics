import { DEFAULT_QUERY_OPTIONS, Endpoint, QueryKey } from '@tracelytics/frontend/domain';
import { TrackableEvent } from '@tracelytics/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useEventsQuery = () => {
    const getAllEvents = async (): Promise<TrackableEvent[]> => {
        const response = await axios.get(Endpoint.Events);
        await sleep(1000);

        return response.data;
    };

    const eventsQuery = useQuery<TrackableEvent[]>([QueryKey.Events], getAllEvents, {
        ...DEFAULT_QUERY_OPTIONS,
    });

    return {
        fetchEvents: eventsQuery.refetch,
        events: eventsQuery.data,
        eventsAreLoading: eventsQuery.isIdle || eventsQuery.isLoading,
    } as { fetchEvents: () => void; events: TrackableEvent[]; eventsAreLoading: boolean };
};

function sleep(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
