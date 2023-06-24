import { Flex, Spacer } from '@chakra-ui/react';
import { Path } from '@tracelytics/frontend/domain';
import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from '../generic/Page';

export const MainDashboard = () => {
    const routes = useMemo(
        () => (
            <Routes>
                {/*<Route path={Path.TRAININGS} element={<TrainingsDashboard />} />*/}
                {/*<Route path={Path.STANDINGS} element={<StandingsDashboard />} />*/}
                {/*<Route path={Path.WINNERS} element={<WinnersDashboard />} />*/}
                {/*<Route element={<RequireAuthRouteAdmin />}>*/}
                {/*    <Route path={Path.TEAMS} element={<TeamsDashboard />} />*/}
                {/*</Route>*/}
                <Route path="*" element={<Navigate to={Path.LANDING_PAGE} replace />} />
            </Routes>
        ),
        [],
    );

    return (
        <Page>
            {/*{isMobile ? <MobileMenu /> : <Sidebar />}*/}

            <Flex mt={['12vh', 0]} flexGrow={1}>
                <Spacer />
                {routes}
                <Spacer />
            </Flex>
        </Page>
    );
};
