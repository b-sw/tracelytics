import { Avatar, Flex, Spacer, Text } from '@chakra-ui/react';
import { Path } from '@tracelytics/frontend/domain';
import { FaTimeline } from 'react-icons/fa6';
import { MdBarChart } from 'react-icons/md';
import { NavigationButton } from './Navigation.button';

export const Sidebar = () => {
    return (
        <Flex
            backgroundColor={'gray.50'}
            shadow={'md'}
            w={'full'}
            h={'64px'}
            p={5}
            position={'absolute'}
            alignItems={'center'}
            zIndex={999}
        >
            <Spacer />
            <Flex gap={10}>
                <Logo />
                <Navigation />
            </Flex>

            <Spacer />
            <Profile />
        </Flex>
    );
};

const Logo = () => {
    return (
        <Flex>
            <Spacer />
            <Text fontSize={'xl'} fontWeight={'bold'} bgGradient={'linear(to-l, #7928CA, #FF0080)'} bgClip={'text'}>
                Tracelytics
            </Text>
            <Spacer />
        </Flex>
    );
};

const Navigation = () => {
    return (
        <Flex gap={5}>
            <NavigationButton path={Path.ANALYTICS} icon={MdBarChart} description={'Analytics'} />
            <NavigationButton path={Path.EVENTS} icon={FaTimeline} description={'Events'} />
        </Flex>
    );
};

const Profile = () => {
    return (
        <Flex alignItems={'center'}>
            <Avatar size={'sm'} shadow={'md'} />
        </Flex>
    );
};
