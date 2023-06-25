import { Flex } from '@chakra-ui/react';
import { DashboardTile } from '../../generic/DashboardTile';

export const EventsPickerTile = () => {
    return (
        <DashboardTile options={{ w: '50%' }}>
            <Flex w={'full'}></Flex>
        </DashboardTile>
    );
};
