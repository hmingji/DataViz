import { useState } from 'react';
import { useAgeGroup } from '../../../hooks/useAgeGroup';
import { RecentQueryInterval } from '../../../hooks/useRecentRatio';
import SelectionGroup from '../../common/SelectionGroup';
import BarChart from '../../common/BarChart';
import { AgeGroupResponse } from '../../../models/AgeGroupResponse';
import { ChartData } from 'chart.js';

const intervalMap: Record<number, RecentQueryInterval> = {
  1: 'month',
  2: 'year',
};

export default function NewDonorAgeGroupSection() {
  const [interval, setInterval] = useState<number>(1);
  const { data, isFetched } = useAgeGroup(
    'Record/newdonor/recent',
    intervalMap[interval]
  );

  function toggleInterval(value: number) {
    setInterval(value);
  }

  //if (!isFetched || !data) return <></>;
  return (
    <section className="w-full max-w-[90vw] xl:max-w-5xl container">
      <header className="pb-4 flex">
        <h1 className="text-2xl font-bold font-secondary mr-auto">
          New donors by age group
        </h1>
        <SelectionGroup
          options={[
            { id: 1, label: 'Past 1 month' },
            { id: 2, label: 'Past 1 year' },
          ]}
          value={interval}
          handleOnChange={toggleInterval}
        />
      </header>
      <BarChart
        chartData={
          data ? generateChartDataset(data) : { labels: [], datasets: [] }
        }
        options={{ plugins: { legend: { display: false } } }}
      />
    </section>
  );
}

function generateChartDataset(res: AgeGroupResponse): ChartData<'bar'> {
  return {
    labels: res.map((p) => p.name),
    datasets: [
      {
        data: res.map((p) => p.value),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
}
