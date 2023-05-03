import Button from '../../../common/Button';
import DropdownMenu from '../../../common/DropdownMenu';
import { ArrowPathSpin } from '../../../common/Icons/ArrowPathSpin';
import { ChevronDown } from '../../../common/Icons/ChevronDown';
import MagnifyingGlass from '../../../common/Icons/MagnifyingGlass';
import MultiSelectListBox from '../../../common/MultiSelectListBox';
import SelectionGroup from '../../../common/SelectionGroup';
import { attributes } from '../../../../constants/attributes';
import { intervals } from '../../../../constants/intervals';
import { states } from '../../../../constants/states';
import { useChart } from '../../../../hooks/useChart';
import { generateChartDataset } from '../../../../utils/generateChartDataset';
import getChartMinDate from '../../../../utils/getChartMinDate';
import { ChartDataset, ChartOptions } from 'chart.js';
import { useRef } from 'react';
import { ChartJSOrUndefined } from '../../../../../node_modules/react-chartjs-2/dist/types';
import LineChart from '../../../common/Charts/LineChart';

export default function NewDonorChartSection() {
  const {
    attribute,
    setAttribute,
    interval,
    setInterval,
    state,
    setState,
    results,
  } = useChart('newdonor');
  const datasets = useRef<ChartDataset<'line'>[]>([{ label: '', data: [] }]);
  const chartRef = useRef<ChartJSOrUndefined<'line'>>(null);

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
        limits: {
          x: { min: interval.chartLimit.min, max: interval.chartLimit.max },
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

  function resetChartZoomState() {
    chartRef.current?.resetZoom();
  }

  return (
    <section
      className="w-full max-w-[90vw] xl:max-w-5xl justify-center flex border border-gray-600 rounded-xl p-4"
      id="newdonor-chart"
    >
      <div className="w-full relative">
        <header className="pb-4">
          <h1 className="text-base font-bold font-secondary">
            New donor Records
          </h1>
        </header>
        <div className="inline-flex w-full flex-wrap justify-between items-center gap-2 pb-2">
          <DropdownMenu
            buttonLabel="Attribute"
            menuItems={attributes
              .filter((attribute) => attribute.category == 'newdonor')
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
        <div className="w-full aspect-[2]">
          <LineChart
            forwardRef={chartRef}
            options={options}
            chartData={{
              datasets: datasets.current,
            }}
          />
        </div>
        <Button
          label="Reset"
          icon={<MagnifyingGlass size="sm" />}
          handleOnClick={resetChartZoomState}
        />
        {!results.every((result) => result.isSuccess) && (
          <div className="absolute top-1/2 left-1/2">
            <ArrowPathSpin size="lg" />
          </div>
        )}
      </div>
    </section>
  );
}
