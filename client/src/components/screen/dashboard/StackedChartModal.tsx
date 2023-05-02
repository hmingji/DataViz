import { ChartData } from 'chart.js';
import { useYearlyRatio } from '../../../hooks/useYearlyRatio';
import { YearlyVariables } from '../../../models/RatioResponse';
import HorizontalStackedChart from '../../common/Charts/HorizontalStackedChart';

interface Props {
  variable: string;
}

export default function StackedChartModal({ variable }: Props) {
  const { data, isFetched } = useYearlyRatio();

  //console.log('yearly ratio fetched: ', data);
  if (isFetched && data) {
    return (
      <div className="w-[70vw] h-[70vh]">
        <HorizontalStackedChart
          chartData={generateChartDataset(data, variable)}
          options={{ scales: { x: { min: 0, max: 100 } } }}
        />
      </div>
    );
  }
  return <></>;
}

function getBackgroundColors(index: number) {
  const colorSet = ['#4338ca', '#0369a1', '#0f766e', '#6ee7b7'];
  return colorSet[index];
}

function generateChartDataset(
  res: YearlyVariables[],
  variable: string
): ChartData<'bar'> {
  const variableItemCount =
    res[0].variables.find((p) => p.name == variable)?.items.length ?? 1;

  const variableItemNames =
    res[0].variables
      .find((p) => p.name == variable)
      ?.items.map((p) => p.name) ?? new Array(variableItemCount).fill('');

  return {
    labels: res.map((p) => p.year),
    datasets: new Array(variableItemCount).fill(0).map((_, index) => {
      return {
        label: variableItemNames[index] as string,
        data: res
          .map((p) => p.variables.find((q) => q.name == variable))
          .map((o) => o!.items[index].value),
        backgroundColor: getBackgroundColors(index),
      };
    }),
  };
}
