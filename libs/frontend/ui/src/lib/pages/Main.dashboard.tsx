import { Flex, Spacer } from '@chakra-ui/react';
import { Path } from '@tracelytics/frontend/domain';
import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from '../generic';
import { Sidebar } from '../sidebar/Sidebar';
import { AnalyticsPage } from './analytics/Analytics.page';
import { EventsPage } from './events/Events.page';
import { PlaygroundPage } from './playground/Playground.page';

export const MainDashboard = () => {
    const routes = useMemo(
        () => (
            <Routes>
                <Route path="*" element={<Navigate to={Path.DASHBOARD} replace />} />

                <Route path={Path.ANALYTICS} element={<AnalyticsPage />} />
                <Route path={Path.EVENTS} element={<EventsPage />} />
                <Route path={Path.PLAYGROUND} element={<PlaygroundPage />} />
            </Routes>
        ),
        [],
    );

    return (
        <>
            <Sidebar />
            <Page>
                <Flex mt={'64px'} flexGrow={1}>
                    <Spacer />
                    {routes}
                    <Spacer />
                </Flex>
            </Page>
        </>
    );
};
