import { Flex, FlexProps } from '@chakra-ui/react';

type Props = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
    options?: FlexProps;
};

export const TableItems = ({ children, options }: Props) => {
    return (
        <Flex
            w={'full'}
            h={'fit-content'}
            direction={'column'}
            shadow={'md'}
            overflowY={'scroll'}
            backgroundColor={'gray.50'}
            borderRadius={25}
            {...options}
        >
            {children}
        </Flex>
    );
};
