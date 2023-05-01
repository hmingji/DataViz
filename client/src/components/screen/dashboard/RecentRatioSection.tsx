import { ChartData } from 'chart.js';
import { Variable } from '../../../models/RecentRatioResponse';
import {
  RecentQueryInterval,
  useRecentRatio,
} from '../../../hooks/useRecentRatio';
import DoughnutChart from '../../common/DoughnutChart';
import { useState } from 'react';
import SelectionGroup from '../../common/SelectionGroup';

const intervalMap: Record<number, RecentQueryInterval> = {
  1: 'month',
  2: 'year',
};

export default function RecentRatioSection() {
  const [interval, setInterval] = useState<number>(1);
  const { data, isFetched } = useRecentRatio(
    'Record/donation/ratio',
    intervalMap[interval]
  );

  function toggleInterval(value: number) {
    setInterval(value);
  }

  if (isFetched && data) {
    return (
      <div className="max-w-[90vw] xl:max-w-5xl flex flex-col gap-4">
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold font-secondary mr-auto">
            A breakdown of donations by key variables
          </h1>
          <SelectionGroup
            options={[
              { id: 1, label: 'Past 1 month' },
              { id: 2, label: 'Past 1 year' },
            ]}
            value={interval}
            handleOnChange={toggleInterval}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {data.map((p) => {
            const chartData = generateChartDataset(p);
            return (
              <div
                key={p.name}
                className="border border-gray-500 p-4 rounded-md"
              >
                <h3 className="font-secondary mb-4">{p.name}</h3>
                <DoughnutChart chartData={chartData} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <></>;
}

function generateChartDataset(variable: Variable): ChartData<'doughnut'> {
  return {
    labels: [...variable.items.map((p) => p.name)],
    datasets: [
      {
        label: 'percentage',
        data: [...variable.items.map((p) => p.value)],
        backgroundColor: getBackgroundColors(variable.items.length),
        borderWidth: 0,
      },
    ],
  };
}

function getBackgroundColors(quantity: number) {
  //todo generate color set based on quantity
  const colorSet = ['#4338ca', '#0369a1', '#0f766e', '#6ee7b7'];
  return colorSet.slice(0, quantity);
}
