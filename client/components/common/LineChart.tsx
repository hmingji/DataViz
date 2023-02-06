import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import dynamic from 'next/dynamic';
//const zoomPlugin = dynamic(() => import('chartjs-plugin-zoom'), { ssr: false });
import zoomPlugin from 'chartjs-plugin-zoom';
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
  zoomPlugin,
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
    <div>
      {typeof window !== 'undefined' && (
        <Line
          data={chartData}
          options={options}
        />
      )}
    </div>
  );
}
