import { Flex, Spacer, Text } from '@chakra-ui/react';
import { CalendarState } from '@tracelytics/frontend/application';
import { useInjection } from '@tracelytics/shared/di';
import { useSubscriptionState } from '@tracelytics/shared/flux';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/plugin/isBetween';

type Props = {
    date: Dayjs;
};

export const DayTile = ({ date }: Props) => {
    const calendarState = useInjection<CalendarState>(CalendarState);

    const selectedDateRange = useSubscriptionState(calendarState.selectedDateRange$, calendarState.selectedDateRange);
    const currentMonth = useSubscriptionState(calendarState.currentMonth$, calendarState.currentMonth);

    const isCurrentMonth = date.month() === currentMonth.month();
    const isToday = date.isSame(dayjs(), 'day');
    const isSelected =
        selectedDateRange.start &&
        selectedDateRange.end &&
        date.isBetween(selectedDateRange.start, selectedDateRange.end, 'day', '[]');

    const bgColor = isSelected ? 'tcs.500' : isToday ? 'tcs.100' : 'gray.50';
    const textColor = isSelected ? 'white' : isToday ? 'gray.800' : 'gray.800';

    document.onmouseup = () => {
        calendarState.isSelecting = false;
    };

    return (
        <Flex
            p={1}
            rounded={'full'}
            alignItems={'center'}
            bgColor={bgColor}
            textColor={textColor}
            _hover={
                isSelected
                    ? {}
                    : {
                          bgColor: 'tcs.50',
                      }
            }
            cursor={'pointer'}
            onMouseDown={() => {
                calendarState.isSelecting = true;
                calendarState.selectedDateRange = { start: date, end: date };
            }}
            onMouseOver={() => {
                if (calendarState.isSelecting) {
                    calendarState.selectedDateRange = { start: calendarState.selectedDateRange.start, end: date };
                }
            }}
            onMouseUp={() => {
                calendarState.isSelecting = false;
                calendarState.selectedDateRange = { start: calendarState.selectedDateRange.start, end: date };
            }}
        >
            <Spacer />
            <Text fontWeight={'medium'} fontSize={'md'} opacity={isCurrentMonth ? 1 : 0.3} userSelect={'none'}>
                {date.format('D')}
            </Text>
            <Spacer />
        </Flex>
    );
};
