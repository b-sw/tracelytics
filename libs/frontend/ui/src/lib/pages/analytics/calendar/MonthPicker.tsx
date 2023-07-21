import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer } from '@chakra-ui/react';
import { SwitchCalendarMonthActionCreator } from '@tracelytics/frontend/application';
import { SwitchDirection } from '@tracelytics/frontend/domain';
import { useInjection } from '@tracelytics/shared/di';
import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

export const MonthPicker = ({ children }: Props) => {
    const switchMonthActionCreator = useInjection<SwitchCalendarMonthActionCreator>(SwitchCalendarMonthActionCreator);

    return (
        <Flex alignItems={'center'}>
            <Spacer />
            <IconButton
                icon={<ArrowBackIcon />}
                aria-label={'Previous month'}
                rounded={'full'}
                onClick={() => switchMonthActionCreator.create(SwitchDirection.Left)}
            />

            <Flex w={'40%'} fontWeight={'semibold'} fontSize={'2xl'} gap={2}>
                {children}
            </Flex>

            <IconButton
                icon={<ArrowForwardIcon />}
                aria-label={'Next month'}
                rounded={'full'}
                onClick={() => switchMonthActionCreator.create(SwitchDirection.Right)}
            />
            <Spacer />
        </Flex>
    );
};
