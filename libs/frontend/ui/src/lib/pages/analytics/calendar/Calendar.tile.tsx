import { Flex, SlideFade, Spacer, Text } from '@chakra-ui/react';
import { CalendarState } from '@tracelytics/frontend/application';
import { useInjection } from '@tracelytics/shared/di';
import { useSubscriptionState } from '@tracelytics/shared/flux';
import { DashboardTile } from '../../../generic';
import { DaysGrid } from './Days.grid';
import { MonthPicker } from './MonthPicker';

export const CalendarTile = () => {
    const calendarState = useInjection<CalendarState>(CalendarState);

    const currentMonth = useSubscriptionState(calendarState.currentMonth$, calendarState.currentMonth);
    const switchDirection = useSubscriptionState(calendarState.switchDirection$, calendarState.switchDirection);

    return (
        <DashboardTile options={{ w: 'full' }}>
            <Flex direction={'column'} w={'full'} gap={5}>
                <MonthPicker>
                    <Flex w={'60%'} textColor={'gray.900'}>
                        <Spacer />
                        <Flex>
                            <SlideFade
                                in={true}
                                key={currentMonth.format('MM-YYYY')}
                                offsetX={75 * (switchDirection ?? 1)}
                                offsetY={0}
                                style={{ height: '100%', overflow: 'hidden' }}
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

                <DaysGrid />
            </Flex>
        </DashboardTile>
    );
};
