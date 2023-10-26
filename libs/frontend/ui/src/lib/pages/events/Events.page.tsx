import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { useEventsQuery } from '@tracelytics/frontend/application';
import { TrackableEvent } from '@tracelytics/shared/types';
import { useEffect, useState } from 'react';
import { Dashboard, NoRecords, SearchInput, Table, TableItems } from '../../generic';
import { EventListItem } from './Event.list-item';
import { AddEventModal } from './modals/AddEvent.modal';
import { RemoveEventModal } from './modals/RemoveEvent.modal';

export const EventsPage = () => {
    const { events, eventsAreLoading, fetchEvents } = useEventsQuery();
    const [eventToRemove, setEventToRemove] = useState<TrackableEvent | null>(null);
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveClose } = useDisclosure();

    useEffect(() => {
        fetchEvents();
    }, []);

    const getSkeletonLoading = () => {
        return Array.from(Array(20).keys()).map((_, index) => <EventListItem key={index} event={null} />);
    };

    const getEventsListItems = () => {
        if (events.length === 0) {
            return <NoRecords message={'No events found'} />;
        }
        return events.map((event, index) => (
            <EventListItem
                key={index}
                event={event}
                handleDelete={() => {
                    setEventToRemove(event);
                    onRemoveOpen();
                }}
            />
        ));
    };

    return (
        <Dashboard>
            {isAddOpen && <AddEventModal isOpen={isAddOpen} onClose={onAddClose} />}
            {eventToRemove && <RemoveEventModal event={eventToRemove} isOpen={isRemoveOpen} onClose={onRemoveClose} />}
            <Table>
                <Flex gap={5}>
                    <IconButton
                        size={'lg'}
                        aria-label={'add-event'}
                        backgroundColor={'#7928CA'}
                        _hover={{
                            backgroundColor: '#5a00af',
                        }}
                        _active={{
                            backgroundColor: '#8945d2',
                        }}
                        rounded={'full'}
                        icon={<AddIcon />}
                        onClick={onAddOpen}
                    />
                    <SearchInput handleChange={() => {}} placeholder={'Search for events'} />
                </Flex>

                <TableItems>{eventsAreLoading ? getSkeletonLoading() : getEventsListItems()}</TableItems>
            </Table>
        </Dashboard>
    );
};
