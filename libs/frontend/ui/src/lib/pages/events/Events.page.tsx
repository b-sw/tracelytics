import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { useEventsQuery } from '@tracelytics/frontend/application';
import { useEffect } from 'react';
import { Dashboard, SearchInput, Table, TableItems } from '../../generic';
import { EventListItem } from './Event.list-item';
import { AddEventModal } from './modals/AddEvent.modal';

export const EventsPage = () => {
    const { events, eventsAreLoading, fetchEvents } = useEventsQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchEvents();
    }, []);

    const getSkeletonLoading = () => {
        return Array.from(Array(20).keys()).map((_, index) => <EventListItem key={index} event={null} />);
    };

    const getEventsListItems = () => {
        return events.map((event, index) => <EventListItem key={index} event={event} />);
    };

    return (
        <Dashboard>
            <AddEventModal isOpen={isOpen} handleClose={onClose} />
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
                        onClick={onOpen}
                    />
                    <SearchInput handleChange={() => {}} placeholder={'Search for events'} />
                </Flex>

                <TableItems>{eventsAreLoading ? getSkeletonLoading() : getEventsListItems()}</TableItems>
            </Table>
        </Dashboard>
    );
};
