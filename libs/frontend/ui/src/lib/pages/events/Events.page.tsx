import { Dashboard } from '../../generic/Dashboard';
import { SearchInput } from '../../generic/SearchInput';
import { Table } from '../../generic/Table';
import { TableItems } from '../../generic/TableItems';
import { EventListItem } from './Event.list-item';

export const EventsPage = () => {
    return (
        <Dashboard>
            <Table>
                <SearchInput handleChange={() => {}} placeholder={'Search for events'} />

                <TableItems>
                    {Array.from({ length: 30 }, (_, index) => (
                        <EventListItem key={index} />
                    ))}
                </TableItems>
            </Table>
        </Dashboard>
    );
};
