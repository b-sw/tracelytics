import { Flex } from '@chakra-ui/react';
import { Dashboard } from '../../generic/Dashboard';
import { CalendarTile } from './calendar/Calendar.tile';
import { ChartTile } from './Chart.tile';
import { EventsPickerTile } from './EventsPicker.tile';

export const AnalyticsPage = () => {
    return (
        <Dashboard>
            <Flex direction={'column'} w={'full'} h={'full'} p={5} gap={10}>
                <Flex w={'full'} h={'50%'}>
                    <ChartTile />
                </Flex>

                <Flex w={'full'} h={'50%'} gap={10}>
                    <EventsPickerTile />
                    <CalendarTile />
                </Flex>
            </Flex>
        </Dashboard>
    );
};
