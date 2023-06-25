import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Grid, IconButton, SlideFade, Spacer, Text } from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { DashboardTile } from '../../generic/DashboardTile';

enum SlideDirection {
    LEFT = -1,
    RIGHT = 1,
}

export const CalendarTile = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [monthOffset, setMonthOffset] = useState(0);
    const [slideDirection, setSlideDirection] = useState(SlideDirection.RIGHT);

    const MonthPicker = () => (
        <Flex alignItems={'center'}>
            <Spacer />
            <IconButton
                icon={<ArrowBackIcon />}
                aria-label={'Previous month'}
                rounded={'full'}
                onClick={() => {
                    setMonthOffset((prev) => prev - 1);
                    setSlideDirection(SlideDirection.LEFT);
                }}
            />

            <Flex w={'40%'} fontWeight={'semibold'} fontSize={'2xl'} gap={2}>
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
            </Flex>

            <IconButton
                icon={<ArrowForwardIcon />}
                aria-label={'Next month'}
                rounded={'full'}
                onClick={() => {
                    setMonthOffset((prev) => prev + 1);
                    setSlideDirection(SlideDirection.RIGHT);
                }}
            />
            <Spacer />
        </Flex>
    );

    const DayTiles = () => {
        return (
            <Flex>
                <SlideFade
                    in={true}
                    key={monthOffset}
                    offsetX={75 * slideDirection}
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
                        {getMonthDays(dayjs().add(monthOffset, 'month')).map((date) => (
                            <DayTile key={date.toString()} date={date} />
                        ))}
                    </Grid>
                </SlideFade>
            </Flex>
        );
    };

    const DayTile = ({ date }: { date: Dayjs }) => {
        const isCurrentMonth = date.month() === dayjs().add(monthOffset, 'month').month();
        const isToday = date.isSame(dayjs(), 'day');
        const isSelected = date.isSame(selectedDate, 'day');

        const bgColor = isSelected ? 'tcs.500' : isToday ? 'tcs.100' : 'gray.50';
        const textColor = isSelected ? 'white' : isToday ? 'gray.800' : 'gray.800';

        return (
            <Flex
                px={7}
                py={2}
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
                onClick={() => setSelectedDate(date)}
            >
                <Spacer />
                <Text fontWeight={'medium'} fontSize={'md'} opacity={isCurrentMonth ? 1 : 0.3}>
                    {date.format('D')}
                </Text>
                <Spacer />
            </Flex>
        );
    };

    return (
        <DashboardTile options={{ w: '50%' }}>
            <Flex direction={'column'} w={'full'} gap={5}>
                <MonthPicker />
                <WeekDays />
                <DayTiles />
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
