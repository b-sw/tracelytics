import { Flex, Grid, SlideFade } from '@chakra-ui/react';
import { CalendarState } from '@tracelytics/frontend/application';
import { useInjection } from '@tracelytics/shared/di';
import { useSubscriptionState } from '../../../generic';
import { DayTile } from './Day.tile';

export const DaysGrid = () => {
    const calendarState = useInjection<CalendarState>(CalendarState);

    const switchDirection = useSubscriptionState(calendarState.switchDirection$, calendarState.switchDirection);
    const days = useSubscriptionState(calendarState.currentMonthDays$, calendarState.currentMonthDays);

    return (
        <Flex>
            <SlideFade
                in={true}
                offsetX={75 * (switchDirection ?? 1)}
                offsetY={0}
                style={{ height: '100%', overflow: 'hidden' }}
            >
                <Grid
                    templateColumns={'repeat(7, 1fr)'}
                    templateRows={'repeat(6, 1fr)'}
                    gap={3}
                    overflow={'hidden'}
                    h={'100%'}
                >
                    {days.map((date) => (
                        <DayTile key={date.toString()} date={date} />
                    ))}
                </Grid>
            </SlideFade>
        </Flex>
    );
};
