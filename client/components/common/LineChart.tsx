import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import {
  Chart as ChartJS,
  TimeScale, //Import timescale instead of category for X axis
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  TimeScale, //Register timescale instead of category for X axis
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  chartData: ChartData<'line'>;
  options: ChartOptions<'line'>;
}
//TODO: toggle option and data change, zoomable
export default function LineChart({ chartData, options }: Props) {
  return (
    <Line
      data={chartData}
      options={options}
    />
  );
}
