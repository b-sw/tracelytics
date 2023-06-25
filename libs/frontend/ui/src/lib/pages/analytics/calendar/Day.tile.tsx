import { Flex, Spacer, Text } from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';

type Props = {
    date: Dayjs;
    selectedDate: Dayjs;
    monthOffset: number;
    onClick: (date: Dayjs) => void;
};

export const DayTile = ({ date, selectedDate, monthOffset, onClick }: Props) => {
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
            onClick={() => onClick(date)}
        >
            <Spacer />
            <Text fontWeight={'medium'} fontSize={'md'} opacity={isCurrentMonth ? 1 : 0.3}>
                {date.format('D')}
            </Text>
            <Spacer />
        </Flex>
    );
};
