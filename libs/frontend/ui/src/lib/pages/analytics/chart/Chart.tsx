import { Flex, FlexProps, Spacer } from '@chakra-ui/react';
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

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => (Math.random() * 1000).toFixed(2)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => (Math.random() * 1000).toFixed(2)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Flex {...options} width={'full'} height={'full'} alignItems={'center'}>
            <Spacer />
            <Line options={opts} data={data} />
            <Spacer />
        </Flex>
    );
};
