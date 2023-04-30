import {
  Chart as ChartJS,
  ArcElement,
  ChartData,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  chartData: ChartData<'doughnut'>;
  options?: ChartOptions<'doughnut'>;
}

export default function DoughnutChart({ chartData, options }: Props) {
  return (
    <Doughnut
      data={chartData}
      options={options}
    ></Doughnut>
  );
}
