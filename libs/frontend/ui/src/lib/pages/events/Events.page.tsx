import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import { Dashboard, SearchInput, Table, TableItems } from '../../generic';
import { EventListItem } from './Event.list-item';

export const EventsPage = () => {
    return (
        <Dashboard>
            <Table>
                <Flex gap={5}>
                    <IconButton
                        size={'lg'}
                        aria-label={'add-event'}
                        backgroundColor={'#7928CA'}
                        _hover={{
                            backgroundColor: '#5a00af',
                        }}
                        _active={{
                            backgroundColor: '#8945d2',
                        }}
                        rounded={'full'}
                        icon={<AddIcon />}
                    />
                    <SearchInput handleChange={() => {}} placeholder={'Search for events'} />
                </Flex>

                <TableItems>
                    {Array.from({ length: 30 }, (_, index) => (
                        <EventListItem key={index} />
                    ))}
                </TableItems>
            </Table>
        </Dashboard>
    );
};
