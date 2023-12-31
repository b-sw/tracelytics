import { Flex } from '@chakra-ui/react';
import { usePeriodEventsQuery } from '@tracelytics/frontend/application';
import { useEffect } from 'react';
import { NoRecords, SearchInput, TableItems } from '../../../generic';
import { LegendListItem } from './Legend.list-item';

export const EventsPickerTile = () => {
    const { events, fetchEvents, eventsAreLoading } = usePeriodEventsQuery();
    const maxEventCount = Math.max(...(events?.map(event => event.totalCount) || []));

    useEffect(() => {
        fetchEvents();
    }, []);

    const getLoadedEvents = () => {
        if (events.length === 0) {
            return <NoRecords message={'No events found in the specified date range'} />;
        } else
            return events.map((event, index) => <LegendListItem key={index} event={event} maxCount={maxEventCount} />);
    };

    const getSkeletonLoading = () => {
        return Array.from({ length: 10 }, (_, index) => <LegendListItem key={index} event={null} />);
    };

    return (
        <Flex direction={'column'} w={'full'} maxH={'100%'}>
            <SearchInput handleChange={() => {}} placeholder={'Search for events'} />
            <TableItems>{eventsAreLoading ? getSkeletonLoading() : getLoadedEvents()}</TableItems>
        </Flex>
    );
};
