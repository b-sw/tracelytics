import { ChakraProvider } from '@chakra-ui/react';
import { Path } from '@tracelytics/frontend/domain';
import { MainDashboard, theme } from '@tracelytics/frontend/ui';
import { DIApplication, DIProvider } from '@tracelytics/shared/di';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { RootModule } from './root.module';

import './styles.css';

dayjs.extend(utc);
dayjs.extend(isBetween);

export const App = () => {
    const application = new DIApplication(RootModule);

    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={new QueryClient()}>
                <ReactQueryDevtools initialIsOpen={false} />
                <DIProvider container={application.rootContainer}>
                    <Router basename="/">
                        <Routes>
                            {/*<Route path={Path.LANDING_PAGE} element={<LandingPage />} />*/}

                            <Route path={`${Path.DASHBOARD}/*`} element={<MainDashboard />} />
                            <Route path={'*'} element={<Navigate to={Path.DASHBOARD} replace />} />
                        </Routes>
                    </Router>
                </DIProvider>
            </QueryClientProvider>
        </ChakraProvider>
    );
};
