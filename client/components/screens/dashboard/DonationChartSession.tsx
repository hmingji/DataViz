import DropdownMenu from '@/components/common/DropdownMenu';
import { ChevronDown } from '@/components/common/Icons/ChevronDown';
import MultiSelectListBox from '@/components/common/MultiSelectListBox';
import SelectionGroup from '@/components/common/SelectionGroup';
import { attributes } from '@/constants/attributes';
import { intervals } from '@/constants/intervals';
import { states } from '@/constants/states';
import { useChart } from '@/hooks/useChart';
import { generateChartDataset } from '@/utils/generateChartDataset';
import getChartMinDate from '@/utils/getChartMinDate';
import { ChartDataset, ChartOptions } from 'chart.js';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
const LineChart = dynamic(() => import('@/components/common/LineChart'), {
  ssr: false,
});

export default function DonationChartSession() {
  const {
    attribute,
    setAttribute,
    interval,
    setInterval,
    state,
    setState,
    results,
  } = useChart('donation');
  const datasets = useRef<ChartDataset<'line'>[]>([{ label: '', data: [] }]);

  if (results.every((result) => result.isSuccess == true && result.data))
    datasets.current = results.map((r) => generateChartDataset(r.data!));

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: interval.chartUnit,
        },
        min: getChartMinDate(interval.chartUnit),
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      zoom: {
        zoom: {
          drag: {
            enabled: true,
          },
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl',
        },
      },
    },
  };

  function handleDropdownOnClick(item: string) {
    const latestAttribute = attributes.find(
      (attribute) => attribute.displayName == item
    );
    if (latestAttribute) setAttribute(latestAttribute);
  }

  function handleIntervalOnChange(item: number) {
    const latestInterval = intervals.find((interval) => interval.id == item);
    if (latestInterval) setInterval(latestInterval);
  }

  function handleStatesOnChange(items: number[]) {
    const latestStates = states.filter((state) => items.includes(state.id));
    if (latestStates) setState(latestStates);
  }

  return (
    <div className="w-full max-w-5xl">
      <div className="inline-flex w-full flex-wrap justify-between items-center">
        <DropdownMenu
          buttonLabel="Attribute"
          menuItems={attributes
            .filter((attribute) => attribute.category == 'donation')
            .map((attribute) => attribute.displayName)}
          handleOnClick={handleDropdownOnClick}
          buttonIcon={<ChevronDown size="sm" />}
          selectedItem={attribute.displayName}
        />

        <SelectionGroup
          options={intervals.map((interval) => {
            return {
              id: interval.id,
              label: interval.displayName,
            };
          })}
          handleOnChange={handleIntervalOnChange}
          value={interval.id}
        />

        <MultiSelectListBox
          buttonLabel="States"
          options={states.map((state) => {
            return {
              id: state.id,
              label: state.displayName,
            };
          })}
          handleOnChange={handleStatesOnChange}
          value={state.map((item) => item.id)}
          optionWithIcon={false}
        />
      </div>
      <div className="w-full h-full relative aspect-[2]">
        <LineChart
          options={options}
          chartData={{
            datasets: datasets.current,
          }}
        />
      </div>
    </div>
  );
}
