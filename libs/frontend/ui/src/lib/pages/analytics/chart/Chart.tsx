import { Flex, FlexProps, Spacer, Spinner } from '@chakra-ui/react';
import { CalendarState, ChartState, usePeriodEventsQuery } from '@tracelytics/frontend/application';
import { DATE_FORMAT } from '@tracelytics/frontend/domain';
import { useInjection } from '@tracelytics/shared/di';
import { useSubscriptionState } from '@tracelytics/shared/flux';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    options?: FlexProps;
};

export const Chart = ({ options }: Props) => {
    const { eventColors$, eventColors } = useInjection(ChartState);
    const colors = useSubscriptionState(eventColors$, eventColors);

    const { selectedDateRange$, selectedDateRange } = useInjection(CalendarState);
    const dateRange = useSubscriptionState(selectedDateRange$, selectedDateRange);
    const { events } = usePeriodEventsQuery();

    const opts = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                // position: 'top' as const,
            },
            title: {
                // display: true,
                // text: 'Chart.js Line Chart',
            },
        },
    };

    // if (!events)
    //     return (
    //         <Flex {...options} width={'full'} height={'full'} alignItems={'center'}>
    //             <Spacer />
    //             {/*<Spinner thickness="10px" speed="1s" emptyColor="gray.200" color="tcs.500" w={'200px'} h={'200px'} />*/}
    //             <Line options={opts} data={{ labels: [], datasets: [] }} />
    //             <Spacer />
    //         </Flex>
    //     );

    // sort date range
    const [start, end] = [dateRange.start, dateRange.end].sort((a, b) => a.diff(b, 'day'));
    const days = [];
    for (let day = start; day.isBefore(end, 'day') || day.isSame(end, 'day'); day = day.add(1, 'day')) {
        days.push(day);
    }
    const labels = days.map(day => day.format(DATE_FORMAT));
    const datasets =
        events?.map(event => {
            return {
                label: event.name,
                data: labels.map(day => event.counts[day] ?? 0),
                borderColor: colors.get(event.id),
                backgroundColor: colors.get(event.id),
            };
        }) ?? [];
    const data = { labels, datasets };

    return (
        <Flex {...options} width={'full'} height={'full'} alignItems={'center'} position={'relative'}>
            <Flex position={'absolute'} w={'full'} h={'full'} bg={'none'} alignItems={'center'} pointerEvents={'none'}>
                <Spacer />
                {!events && (
                    <Spinner
                        thickness="10px"
                        speed="1s"
                        emptyColor="gray.200"
                        color="tcs.500"
                        w={'200px'}
                        h={'200px'}
                    />
                )}
                <Spacer />
            </Flex>
            <Spacer />
            <Line options={opts} data={data} />
            <Spacer />
        </Flex>
    );
};
