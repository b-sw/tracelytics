import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer } from '@chakra-ui/react';
import { CalendarState } from '@tracelytics/frontend/application';
import { SwitchDirection } from '@tracelytics/frontend/domain';
import { useInjection } from '@tracelytics/shared/di';
import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

export const MonthPicker = ({ children }: Props) => {
    const calendarState = useInjection(CalendarState);

    return (
        <Flex alignItems={'center'} textColor={'gray.900'}>
            <Spacer />
            <IconButton
                icon={<ArrowBackIcon />}
                aria-label={'Previous month'}
                rounded={'full'}
                onClick={() => calendarState.switchMonth(SwitchDirection.Left)}
                color={'gray.900'}
                _hover={{
                    backgroundColor: 'gray.200',
                }}
            />

            <Flex w={'40%'} fontWeight={'semibold'} fontSize={'2xl'} gap={2}>
                {children}
            </Flex>

            <IconButton
                icon={<ArrowForwardIcon />}
                aria-label={'Next month'}
                rounded={'full'}
                onClick={() => calendarState.switchMonth(SwitchDirection.Right)}
                color={'gray.900'}
                _hover={{
                    backgroundColor: 'gray.200',
                }}
            />
            <Spacer />
        </Flex>
    );
};
