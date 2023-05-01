import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  chartData: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
}

export default function BarChart({ chartData, options }: Props) {
  return (
    <Bar
      data={chartData}
      options={options}
    ></Bar>
  );
}
