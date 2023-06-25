import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    onSlideLeft: () => void;
    onSlideRight: () => void;
    children?: ReactNode;
};

export const MonthPicker = ({ onSlideLeft, onSlideRight, children }: Props) => {
    return (
        <Flex alignItems={'center'}>
            <Spacer />
            <IconButton
                icon={<ArrowBackIcon />}
                aria-label={'Previous month'}
                rounded={'full'}
                onClick={() => onSlideLeft()}
            />

            <Flex w={'40%'} fontWeight={'semibold'} fontSize={'2xl'} gap={2}>
                {children}
            </Flex>

            <IconButton
                icon={<ArrowForwardIcon />}
                aria-label={'Next month'}
                rounded={'full'}
                onClick={() => onSlideRight()}
            />
            <Spacer />
        </Flex>
    );
};
