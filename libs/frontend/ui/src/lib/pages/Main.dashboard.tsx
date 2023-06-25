import { Flex, Spacer } from '@chakra-ui/react';
import { Path } from '@tracelytics/frontend/domain';
import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from '../generic/Page';
import { Sidebar } from '../sidebar/Sidebar';
import { AnalyticsPage } from './analytics/Analytics.page';
import { EventsPage } from './events/Events.page';

export const MainDashboard = () => {
    const routes = useMemo(
        () => (
            <Routes>
                <Route path="*" element={<Navigate to={Path.DASHBOARD} replace />} />

                <Route path={Path.ANALYTICS} element={<AnalyticsPage />} />
                <Route path={Path.EVENTS} element={<EventsPage />} />
            </Routes>
        ),
        [],
    );

    return (
        <Page>
            <Sidebar />
            <Flex mt={['12vh', 0]} flexGrow={1}>
                <Spacer />
                {routes}
                <Spacer />
            </Flex>
        </Page>
    );
};
