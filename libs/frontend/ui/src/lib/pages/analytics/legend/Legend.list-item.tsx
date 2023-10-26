import { CloseIcon } from '@chakra-ui/icons';
import {
    Badge,
    CircularProgress,
    CircularProgressLabel,
    Flex,
    IconButton,
    Skeleton,
    SkeletonText,
    Spacer,
    Spinner,
    Text,
} from '@chakra-ui/react';
import { PeriodEvent, TrackableEvent } from '@tracelytics/shared/types';
import { FaFilter } from 'react-icons/fa';
import { ListItem } from '../../../generic';

type Props = {
    event: PeriodEvent | null;
    maxCount?: number;
};

export const LegendListItem = ({ event, maxCount }: Props) => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    return (
        <ListItem>
            <Flex gap={4} alignItems={'center'} w={'100%'} role={'group'}>
                <Flex w={'35%'} gap={4} ml={2} alignItems={'center'}>
                    {event ? (
                        <Flex
                            rounded={5}
                            backgroundColor={randomColor}
                            w={'20px'}
                            h={'20px'}
                            shadow={'base'}
                            cursor={'pointer'}
                        />
                    ) : (
                        <Skeleton rounded={5} w={'20px'} h={'20px'} shadow={'base'} cursor={'pointer'} />
                    )}
                    {event ? (
                        <Text fontSize={'lg'}>{event.name}</Text>
                    ) : (
                        <SkeletonText noOfLines={1} fontSize={'lg'} w={'80%'} skeletonHeight={'4'} />
                    )}
                </Flex>

                <Flex w={'10%'}>
                    {event && maxCount ? (
                        <CircularProgress value={(event.count / maxCount) * 100} color={'tcs.500'} size={'40px'}>
                            <CircularProgressLabel>
                                <Text fontSize={'xs'}>{event.count}</Text>
                            </CircularProgressLabel>
                        </CircularProgress>
                    ) : (
                        <Spinner
                            thickness="4px"
                            speed="1s"
                            emptyColor="gray.200"
                            color="tcs.500"
                            w={'40px'}
                            h={'40px'}
                        />
                    )}
                </Flex>

                <Flex direction={'row'} w={'30%'} gap={2}>
                    <CategoryBadge event={event} />
                    <StatusBadge event={event} />
                </Flex>

                <Spacer />
                <EventActions event={event} />
            </Flex>
        </ListItem>
    );
};

// TODO: copy-pasted for now
const StatusBadge = ({ event }: { event: TrackableEvent | null }) => {
    return (
        <Flex>
            {event ? (
                <Badge
                    fontSize={'12'}
                    fontWeight={'italic'}
                    textColor={'green.700'}
                    backgroundColor={'green.50'}
                    border={'1px'}
                    borderRadius={15}
                >
                    <Text px={1}>Active</Text>
                </Badge>
            ) : (
                <Skeleton w={'60px'} h={'18px'} borderRadius={15} />
            )}
        </Flex>
    );
};

const CategoryBadge = ({ event }: { event: TrackableEvent | null }) => {
    return (
        <Flex>
            {event ? (
                <Badge
                    variant={'solid'}
                    fontWeight={'semibold'}
                    backgroundColor={'gray.300'}
                    textColor={'gray.800'}
                    alignSelf={'center'}
                    borderRadius={15}
                    letterSpacing={'.5px'}
                >
                    <Text px={1}>Event category</Text>
                </Badge>
            ) : (
                <Skeleton w={'132px'} h={'18px'} borderRadius={15} />
            )}
        </Flex>
    );
};

const EventActions = ({ event }: { event: TrackableEvent | null }) => {
    return (
        <Flex _hover={{ child: { display: 'inherit' } }}>
            <Flex gap={2}>
                <IconButton
                    color={'gray.600'}
                    rounded={'full'}
                    variant={'ghost'}
                    aria-label="edit"
                    icon={<FaFilter />}
                    opacity={0}
                    disabled={!event}
                    _groupHover={{
                        opacity: event ? 1 : 0.5,
                        cursor: event ? 'pointer' : 'default',
                    }}
                />
                <IconButton
                    color={'red.600'}
                    rounded={'full'}
                    variant={'ghost'}
                    aria-label="delete"
                    icon={<CloseIcon />}
                    opacity={0}
                    disabled={!event}
                    _groupHover={{
                        opacity: event ? 1 : 0.5,
                        cursor: event ? 'pointer' : 'default',
                    }}
                />
            </Flex>
        </Flex>
    );
};
