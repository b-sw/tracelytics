import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Badge,
    Checkbox,
    CircularProgress,
    CircularProgressLabel,
    Flex,
    IconButton,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { ListItem } from '../../generic/ListItem';

export const EventListItem = () => {
    return (
        <ListItem>
            <Flex gap={4} alignItems={'center'} w={'100%'} role={'group'}>
                <Flex w={'35%'} gap={4}>
                    <Checkbox variant={'circular'} />
                    <Text fontSize={'xl'}>Button clicked</Text>
                </Flex>

                <Flex w={'10%'}>
                    <CircularProgress value={75} color={'tcs.500'} size={'60px'}>
                        <CircularProgressLabel>
                            <Text fontSize={'md'}>1324</Text>
                        </CircularProgressLabel>
                    </CircularProgress>
                </Flex>

                <Flex direction={'column'} w={'30%'} gap={2}>
                    <CategoryBadge />
                    <StatusBadge />
                </Flex>

                <Spacer />
                <EventActions />
            </Flex>
        </ListItem>
    );
};

const StatusBadge = () => {
    return (
        <Flex>
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
        </Flex>
    );
};

const CategoryBadge = () => {
    return (
        <Flex>
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
        </Flex>
    );
};

const EventActions = () => {
    return (
        <Flex _hover={{ child: { display: 'inherit' } }}>
            <Flex gap={2}>
                <IconButton
                    rounded={'full'}
                    variant={'ghost'}
                    aria-label="edit"
                    icon={<EditIcon />}
                    opacity={0}
                    cursor={'default'}
                    _groupHover={{
                        opacity: 1,
                        cursor: 'pointer',
                    }}
                />
                <IconButton
                    rounded={'full'}
                    variant={'ghost'}
                    aria-label="delete"
                    icon={<DeleteIcon />}
                    opacity={0}
                    cursor={'default'}
                    _groupHover={{
                        opacity: 1,
                        cursor: 'pointer',
                    }}
                />
            </Flex>
        </Flex>
    );
};
