import { Flex, Grid, SlideFade } from '@chakra-ui/react';
import { Dayjs } from 'dayjs';
import { DayTile } from './Day.tile';

type Props = {
    monthOffset: number;
    selectedDate: Dayjs;
    slideDirection: number;
    days: Dayjs[];
    onClick: (date: Dayjs) => void;
};

export const DaysGrid = ({ monthOffset, selectedDate, slideDirection, days, onClick }: Props) => {
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
                    {days.map((date) => (
                        <DayTile
                            key={date.toString()}
                            date={date}
                            selectedDate={selectedDate}
                            monthOffset={monthOffset}
                            onClick={onClick}
                        />
                    ))}
                </Grid>
            </SlideFade>
        </Flex>
    );
};
