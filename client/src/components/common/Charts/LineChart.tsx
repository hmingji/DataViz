import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
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
import { Ref } from 'react';
import { ChartJSOrUndefined } from '../../../../node_modules/react-chartjs-2/dist/types';

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
  forwardRef?: Ref<ChartJSOrUndefined<'line'>>;
}
//TODO: toggle option and data change, zoomable
export default function LineChart({ chartData, options, forwardRef }: Props) {
  return (
    <>
      {typeof window !== 'undefined' && (
        <Line
          ref={forwardRef}
          data={chartData}
          options={options}
          role="line-chart"
        />
      )}
    </>
  );
}
