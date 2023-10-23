import { Flex, FlexProps } from '@chakra-ui/react';

type Props = {
    children?: (JSX.Element | false)[] | (JSX.Element | false);
    options?: FlexProps;
};

export const DashboardTile = ({ children, options }: Props) => {
    return (
        <Flex
            borderRadius={20}
            p={5}
            shadow={'md'}
            backgroundColor={'gray.50'}
            flexGrow={1}
            {...options}
            overflow={'hidden'}
            w={'full'}
            h={'full'}
        >
            {children}
        </Flex>
    );
};
