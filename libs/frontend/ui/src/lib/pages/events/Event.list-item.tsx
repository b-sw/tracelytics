import { DeleteIcon } from '@chakra-ui/icons';
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
import { TrackableEvent } from '@tracelytics/shared/types';
import { ListItem } from '../../generic';

type Props = {
    event: TrackableEvent | null;
    handleDelete?: () => void;
};

export const EventListItem = ({ event, handleDelete }: Props) => {
    return (
        <ListItem>
            <Flex gap={4} alignItems={'center'} w={'100%'} role={'group'}>
                <Flex w={'35%'} gap={4} ml={2} alignItems={'center'}>
                    {event ? (
                        <Text fontSize={'lg'}>{event!.name}</Text>
                    ) : (
                        <SkeletonText noOfLines={1} fontSize={'lg'} w={'80%'} skeletonHeight={'4'} />
                    )}
                </Flex>

                <Flex w={'10%'}>
                    {event ? (
                        <CircularProgress value={75} color={'tcs.500'} size={'40px'}>
                            <CircularProgressLabel>
                                <Text fontSize={'xs'}>1324</Text>
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
                <EventActions handleDelete={handleDelete} />
            </Flex>
        </ListItem>
    );
};

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

const EventActions = ({ handleDelete }: { handleDelete?: () => void }) => {
    if (!handleDelete) {
        return null;
    }

    return (
        <Flex _hover={{ child: { display: 'inherit' } }}>
            <Flex gap={2}>
                {/*<IconButton*/}
                {/*    color={'gray.600'}*/}
                {/*    rounded={'full'}*/}
                {/*    variant={'ghost'}*/}
                {/*    aria-label="edit"*/}
                {/*    icon={<EditIcon />}*/}
                {/*    opacity={0}*/}
                {/*    cursor={'default'}*/}
                {/*    _groupHover={{*/}
                {/*        opacity: 1,*/}
                {/*        cursor: 'pointer',*/}
                {/*    }}*/}
                {/*/>*/}
                <IconButton
                    color={'red.600'}
                    rounded={'full'}
                    variant={'ghost'}
                    aria-label="delete"
                    icon={<DeleteIcon />}
                    opacity={0}
                    cursor={'default'}
                    onClick={handleDelete}
                    _groupHover={{
                        opacity: 1,
                        cursor: 'pointer',
                    }}
                />
            </Flex>
        </Flex>
    );
};
