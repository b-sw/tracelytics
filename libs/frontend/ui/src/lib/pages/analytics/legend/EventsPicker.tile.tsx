import { Flex } from '@chakra-ui/react';
import { SearchInput, TableItems } from '../../../generic';
import { EventListItem } from '../../events/Event.list-item';

export const EventsPickerTile = () => {
    return (
        <Flex direction={'column'} w={'full'} maxH={'100%'}>
            <SearchInput handleChange={() => {}} placeholder={'Search for events'} />
            <TableItems>
                {Array.from({ length: 40 }, (_, index) => (
                    <EventListItem key={index} />
                ))}
            </TableItems>
        </Flex>
    );
};
