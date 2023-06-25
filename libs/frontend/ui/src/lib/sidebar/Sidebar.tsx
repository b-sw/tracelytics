import { Avatar, Badge, Divider, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { Path } from '@tracelytics/frontend/domain';
import { FaDumbbell } from 'react-icons/fa';
import { MdBarChart, MdLogout } from 'react-icons/md';
import { NavigationButton } from './Navigation.button';

export const Sidebar = () => {
    return (
        <Flex direction={'column'} w={'400px'} backgroundColor={'gray.50'} borderRadius={25} shadow={'md'} p={5} m={5}>
            <Flex>
                <Spacer />
                <Text
                    fontSize={'4xl'}
                    fontWeight={'bold'}
                    bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                    bgClip={'text'}
                >
                    Tracelytics
                </Text>
                <Spacer />
            </Flex>

            <Divider style={{ borderWidth: '2px' }} my={5} />

            <Flex direction={'column'} gap={5}>
                <NavigationButton path={Path.ANALYTICS} icon={FaDumbbell} description={'Analytics'} />
                <NavigationButton path={Path.EVENTS} icon={MdBarChart} description={'Events'} />
            </Flex>

            <Spacer />

            <Flex gap={2} alignItems={'center'}>
                <Avatar size={'lg'} shadow={'md'} />
                <Flex direction={'column'}>
                    <Flex alignItems={'center'} gap={1}>
                        <Text fontSize={'lg'}>Joe Marge</Text>
                    </Flex>
                    <Flex>
                        <Badge
                            fontSize={'10'}
                            fontWeight={'italic'}
                            textColor={'boxBlue.500'}
                            backgroundColor={'blue.50'}
                            border={'1px'}
                            borderRadius={15}
                        >
                            Some division
                        </Badge>
                    </Flex>
                    <Flex direction={'column'}>
                        <Text fontSize={'sm'} color={'gray.400'}>
                            jmarge@email.me
                        </Text>
                    </Flex>
                </Flex>

                <Spacer />
                <IconButton
                    aria-label={'logout'}
                    variant={'ghost'}
                    icon={<MdLogout />}
                    // onClick={logout}
                    rounded={'full'}
                />
            </Flex>
        </Flex>
    );
};
