import { Flex } from '@chakra-ui/react';
import { SearchInput, TableItems } from '../../../generic';
import { LegendListItem } from './Legend.list-item';

export const EventsPickerTile = () => {
    return (
        <Flex direction={'column'} w={'full'} maxH={'100%'}>
            <SearchInput handleChange={() => {}} placeholder={'Search for events'} />
            <TableItems>
                {Array.from({ length: 40 }, (_, index) => (
                    <LegendListItem key={index} />
                ))}
            </TableItems>
        </Flex>
    );
};
