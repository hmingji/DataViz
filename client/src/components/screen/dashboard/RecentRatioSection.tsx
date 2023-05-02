import { ChartData } from 'chart.js';
import { Variable } from '../../../models/RatioResponse';
import {
  RecentQueryInterval,
  useRecentRatio,
} from '../../../hooks/useRecentRatio';
import DoughnutChart from '../../common/Charts/DoughnutChart';
import { Fragment, useState } from 'react';
import SelectionGroup from '../../common/SelectionGroup';
import { ChartIcon } from '../../common/Icons/ChartIcon';
import { Dialog, Transition } from '@headlessui/react';
import StackedChartModal from './StackedChartModal';

const intervalMap: Record<number, RecentQueryInterval> = {
  1: 'month',
  2: 'year',
};

export default function RecentRatioSection() {
  const [interval, setInterval] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [variable, setVariable] = useState('Blood Group');
  const { data, isFetched } = useRecentRatio(
    'Record/donation/ratio',
    intervalMap[interval]
  );

  function toggleInterval(value: number) {
    setInterval(value);
  }

  function openModal(value: string) {
    setIsOpen(true);
    setVariable(value);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (isFetched && data) {
    return (
      <>
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
                  <header className="flex mb-4 items-center">
                    <h3 className="font-secondary mr-auto">{p.name}</h3>
                    <div onClick={() => openModal(p.name)}>
                      <ChartIcon size="md" />
                    </div>
                  </header>
                  <DoughnutChart chartData={chartData} />
                </div>
              );
            })}
          </div>
        </div>
        <Transition
          appear
          show={isOpen}
          as={Fragment}
        >
          <Dialog
            as="div"
            className="relative z-10"
            onClose={closeModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-[95vw] md:max-w-[70vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {variable} (Yearly Record)
                    </Dialog.Title>
                    <div className="mt-2 flex justify-center">
                      <StackedChartModal variable={variable} />
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
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
