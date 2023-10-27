import { Flex, FlexProps, Spacer } from '@chakra-ui/react';
import { CalendarState, usePeriodEventsQuery } from '@tracelytics/frontend/application';
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

    if (!events || !dateRange) return null;

    const { start, end } = dateRange;
    const days = [];
    for (let day = start; day.isBefore(end, 'day') || day.isSame(end, 'day'); day = day.add(1, 'day')) {
        days.push(day);
    }
    const labels = days.map(day => day.format(DATE_FORMAT));

    const datasets = events.map(event => {
        return {
            label: event.name,
            data: labels.map(day => event.counts[day] ?? 0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        };
    });

    const data = { labels, datasets };

    return (
        <Flex {...options} width={'full'} height={'full'} alignItems={'center'}>
            <Spacer />
            <Line options={opts} data={data} />
            <Spacer />
        </Flex>
    );
};
