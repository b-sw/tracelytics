import { Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { VscSearchStop } from 'react-icons/vsc';
import { HeightRegulator } from './HeightRegulator';
import { ListItem } from './ListItem';

type Props = {
    message?: string;
};

export const NoRecords = ({ message }: Props) => {
    return (
        <ListItem>
            <HeightRegulator />
            <Spacer />
            <Flex>
                <Spacer />
                <Flex align={'center'} borderRadius={20} gap={2}>
                    <Icon as={VscSearchStop} color={'gray.500'} opacity={0.5} boxSize={'25px'} />
                    <Text opacity={0.5} size={'xl'}>
                        {message ?? 'No records'}
                    </Text>
                </Flex>
                <Spacer />
            </Flex>
            <Spacer />
        </ListItem>
    );
};
