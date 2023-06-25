import { Flex, SlideFade, Spacer, Text } from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { DashboardTile } from '../../../generic/DashboardTile';
import { DaysGrid } from './Days.grid';
import { MonthPicker } from './MonthPicker';

enum SlideDirection {
    LEFT = -1,
    RIGHT = 1,
}

export const CalendarTile = () => {
    const [days, setDays] = useState<Dayjs[]>([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [monthOffset, setMonthOffset] = useState(0);
    const [slideDirection, setSlideDirection] = useState(SlideDirection.RIGHT);

    useEffect(() => {
        setDays(getMonthDays(dayjs().add(monthOffset, 'month')));
    }, [monthOffset]);

    const switchMonth = (direction: SlideDirection): void => {
        setMonthOffset(monthOffset - direction);
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
                <DaysGrid
                    monthOffset={monthOffset}
                    days={days}
                    slideDirection={slideDirection}
                    selectedDate={selectedDate}
                    onClick={setSelectedDate}
                />
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

const getMonthDays = (date: Dayjs): Dayjs[] => {
    // in dayjs week starts from sunday and is 0 indexed
    const firstDayOffsets: { [key: number]: number } = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
    const pageDaysCount = 42;
    const monthStart = dayjs(date).startOf('month');
    const monthStartDay = monthStart.day();

    let pageDay = monthStart.subtract(firstDayOffsets[monthStartDay], 'day');

    const days = new Array(pageDaysCount);
    for (let i = 0; i < pageDaysCount; i++) {
        days[i] = pageDay;
        pageDay = pageDay.add(1, 'day');
    }

    return days;
};
