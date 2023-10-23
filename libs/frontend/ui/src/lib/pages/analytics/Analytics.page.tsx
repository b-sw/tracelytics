import { Flex } from '@chakra-ui/react';
import { Dashboard } from '../../generic';
import { CalendarTile } from './calendar/Calendar.tile';
import { ChartTile } from './chart/Chart.tile';
import { EventsPickerTile } from './legend/EventsPicker.tile';

export const AnalyticsPage = () => {
    return (
        <Dashboard>
            <Flex direction={'column'} w={'full'} h={'full'} overflow={'hidden'}>
                <Flex w={'full'} h={'50%'} p={5}>
                    <ChartTile />
                </Flex>

                <Flex w={'full'} h={'50%'} gap={10} p={5}>
                    <EventsPickerTile />
                    <CalendarTile />
                </Flex>
            </Flex>
        </Dashboard>
    );
};
