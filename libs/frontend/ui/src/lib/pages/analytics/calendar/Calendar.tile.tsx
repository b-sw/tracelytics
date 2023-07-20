import { Flex, SlideFade, Spacer, Text } from '@chakra-ui/react';
import { SwitchCalendarMonthActionCreator } from '@tracelytics/frontend/application';
import { CalendarState } from '@tracelytics/frontend/states';
import { useInjection } from '@tracelytics/shared/di';
import { ActionCreator } from '@tracelytics/shared/flux';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useSubscriptionState } from '../../../generic';
import { DashboardTile } from '../../../generic/DashboardTile';
import { DaysGrid } from './Days.grid';
import { MonthPicker } from './MonthPicker';

export const CalendarTile = () => {
    const setMonthOffsetActionCreator = useInjection<ActionCreator>(SwitchCalendarMonthActionCreator);
    const calendarState = useInjection<CalendarState>(CalendarState);

    const monthOffset = useSubscriptionState(calendarState.currentMonth$);

    const [days, setDays] = useState<Dayjs[]>([]);
    const [slideDirection, setSlideDirection] = useState(SlideDirection.RIGHT);

    useEffect(() => {
        setDays(getMonthDays(dayjs().add(monthOffset, 'month')));
    }, [monthOffset]);

    const switchMonth = (direction: SlideDirection): void => {
        setMonthOffsetActionCreator.create(monthOffset - direction);
        setSlideDirection(direction);
    };

    return (
        <DashboardTile options={{ w: '50%' }}>
            <Flex direction={'column'} w={'full'} gap={5}>
                <MonthPicker
                    onSlideLeft={() => switchMonth(SlideDirection.LEFT)}
                    onSlideRight={() => switchMonth(SlideDirection.RIGHT)}
                >
                    <Flex w={'60%'}>
                        <Spacer />
                        <Flex>
                            <SlideFade
                                in={true}
                                key={monthOffset}
                                offsetX={20 * slideDirection}
                                offsetY={0}
                                style={{ width: '100%' }}
                            >
                                <Text>{dayjs().add(monthOffset, 'month').format('MMMM')}</Text>
                            </SlideFade>
                        </Flex>
                        <Spacer />
                    </Flex>

                    <Flex w={'40%'}>
                        <Text>{dayjs().add(monthOffset, 'month').format('YYYY')}</Text>
                    </Flex>
                </MonthPicker>

                <WeekDays />
                <DaysGrid days={days} slideDirection={slideDirection} />
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
