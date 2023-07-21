import { Flex, SlideFade, Spacer, Text } from '@chakra-ui/react';
import { CalendarState } from '@tracelytics/frontend/application';
import { useInjection } from '@tracelytics/shared/di';
import { DashboardTile, useSubscriptionState } from '../../../generic';
import { DaysGrid } from './Days.grid';
import { MonthPicker } from './MonthPicker';

export const CalendarTile = () => {
    const calendarState = useInjection<CalendarState>(CalendarState);

    const currentMonth = useSubscriptionState(calendarState.currentMonth$, calendarState.currentMonth);
    const switchDirection = useSubscriptionState(calendarState.switchDirection$, calendarState.switchDirection);

    return (
        <DashboardTile options={{ w: '50%' }}>
            <Flex direction={'column'} w={'full'} gap={5}>
                <MonthPicker>
                    <Flex w={'60%'}>
                        <Spacer />
                        <Flex>
                            <SlideFade
                                in={true}
                                offsetX={20 * (switchDirection ?? 1)}
                                offsetY={0}
                                style={{ width: '100%' }}
                            >
                                <Text>{currentMonth.format('MMMM')}</Text>
                            </SlideFade>
                        </Flex>
                        <Spacer />
                    </Flex>

                    <Flex w={'40%'}>
                        <Text>{currentMonth.format('YYYY')}</Text>
                    </Flex>
                </MonthPicker>

                <WeekDays />
                <DaysGrid />
            </Flex>
        </DashboardTile>
    );
};

const WeekDays = () => {
    return (
        <Flex gap={2} bgColor={'gray.200'} rounded={'full'} p={1} px={5}>
            <Text>MON</Text>
            <Spacer />
            <Text>TUE</Text>
            <Spacer />
            <Text>WED</Text>
            <Spacer />
            <Text>THU</Text>
            <Spacer />
            <Text>FRI</Text>
            <Spacer />
            <Text>SAT</Text>
            <Spacer />
            <Text>SUN</Text>
        </Flex>
    );
};
