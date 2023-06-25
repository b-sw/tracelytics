import { ChakraProvider } from '@chakra-ui/react';
import { Path } from '@tracelytics/frontend/domain';
import { MainDashboard, theme } from '@tracelytics/frontend/ui';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './styles.css';

export const App = () => (
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Router basename="/">
                <Routes>
                    {/*<Route path={Path.LANDING_PAGE} element={<LandingPage />} />*/}
                    <Route path={`${Path.DASHBOARD}/*`} element={<MainDashboard />} />
                    <Route path={'*'} element={<Navigate to={Path.DASHBOARD} replace />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    </ChakraProvider>
);
