import { Flex, Grid, SlideFade, Text } from '@chakra-ui/react';
import { CalendarState } from '@tracelytics/frontend/application';
import { useInjection } from '@tracelytics/shared/di';
import { useSubscriptionState } from '@tracelytics/shared/flux';
import { DayTile } from './Day.tile';

export const DaysGrid = () => {
    const calendarState = useInjection<CalendarState>(CalendarState);

    const switchDirection = useSubscriptionState(calendarState.switchDirection$, calendarState.switchDirection);
    const days = useSubscriptionState(calendarState.currentMonthDays$, calendarState.currentMonthDays);
    const currentMonth = useSubscriptionState(calendarState.currentMonth$, calendarState.currentMonth);

    return (
        <Flex w={'full'} h={'full'} direction={'column'}>
            <WeekDays />
            <SlideFade
                in={true}
                key={currentMonth.format('MM-YYYY')}
                offsetX={75 * (switchDirection ?? 1)}
                offsetY={0}
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            >
                <Grid
                    templateColumns={'repeat(7, 1fr)'}
                    templateRows={'repeat(6, 1fr)'}
                    gap={3}
                    overflow={'hidden'}
                    w={'full'}
                    h={'full'}
                >
                    {days.map(date => (
                        <DayTile key={date.toString()} date={date} />
                    ))}
                </Grid>
            </SlideFade>
        </Flex>
    );
};

const WeekDays = () => {
    const Day = (name: string) => (
        <Text px={7} py={2} rounded={'full'} textAlign={'center'}>
            {name}
        </Text>
    );

    return (
        <Grid
            templateColumns={'repeat(7, 1fr)'}
            templateRows={'repeat(1, 1fr)'}
            gap={3}
            bgColor={'gray.200'}
            rounded={'full'}
            textColor={'gray.900'}
        >
            {Day('MON')}
            {Day('TUE')}
            {Day('WED')}
            {Day('THU')}
            {Day('FRI')}
            {Day('SAT')}
            {Day('SUN')}
        </Grid>
    );
};
