import { DEFAULT_QUERY_OPTIONS, Endpoint, QueryKey } from '@tracelytics/frontend/domain';
import { useInjection } from '@tracelytics/shared/di';
import { useSubscriptionState } from '@tracelytics/shared/flux';
import { PeriodEvent } from '@tracelytics/shared/types';
import axios from 'axios';
import { useQuery } from 'react-query';
import { CalendarState } from '../states';

export const usePeriodEventsQuery = () => {
    const calendarState = useInjection(CalendarState);
    const { start, end } = useSubscriptionState(calendarState.selectedDateRange$, calendarState.selectedDateRange);

    const getPeriodEvents = async (): Promise<PeriodEvent[]> => {
        // sort out the date range
        const [periodStart, periodEnd] = [start, end].sort((a, b) => a.diff(b, 'day'));
        const response = await axios.post(Endpoint.PeriodEvents, { periodStart, periodEnd });

        await sleep(1000);

        return response.data;
    };

    const eventsQuery = useQuery<PeriodEvent[]>(
        [QueryKey.PeriodEvents, start.toISOString(), end.toISOString()],
        getPeriodEvents,
        {
            ...DEFAULT_QUERY_OPTIONS,
        },
    );

    return {
        fetchEvents: eventsQuery.refetch,
        events: eventsQuery.data,
        eventsAreLoading: eventsQuery.isIdle || eventsQuery.isLoading,
    } as { fetchEvents: () => void; events: PeriodEvent[]; eventsAreLoading: boolean };
};

function sleep(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
