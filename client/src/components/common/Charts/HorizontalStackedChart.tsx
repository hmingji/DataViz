import { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface Props {
  chartData: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
}

ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HorizontalStackedChart({ chartData, options }: Props) {
  const stackedChartOptions: ChartOptions<'bar'> = {
    ...options,
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ...(options?.scales?.x ?? {}),
      },
      y: {
        stacked: true,
        ...(options?.scales?.y ?? {}),
      },
    },
  };
  return (
    <Bar
      data={chartData}
      options={stackedChartOptions}
    ></Bar>
  );
}
