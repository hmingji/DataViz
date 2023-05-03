import { ChartData } from 'chart.js';
import { Variable } from '../../../../models/RatioResponse';
import {
  RecentQueryInterval,
  useRecentRatio,
} from '../../../../hooks/useRecentRatio';
import DoughnutChart from '../../../common/Charts/DoughnutChart';
import { Fragment, useState } from 'react';
import SelectionGroup from '../../../common/SelectionGroup';
import { ChartIcon } from '../../../common/Icons/ChartIcon';
import { Dialog, Transition } from '@headlessui/react';
import StackedChartModal from '../StackedChartModal';
import { Tooltip } from 'react-tooltip';

const intervalMap: Record<number, RecentQueryInterval> = {
  1: 'month',
  2: 'year',
};

export default function RecentRatioSection() {
  const [interval, setInterval] = useState<number>(2);
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
        <section className="w-full max-w-[90vw] xl:max-w-5xl border border-gray-500 rounded-lg p-4">
          <div className="flex items-center pb-2">
            <h1 className="text-base font-bold font-secondary mr-auto">
              Key Variables
            </h1>
            <div className="max-w-[200px]">
              <SelectionGroup
                options={[
                  { id: 1, label: 'Past 1 mth' },
                  { id: 2, label: 'Past 1 yr' },
                ]}
                value={interval}
                handleOnChange={toggleInterval}
                textSize="text-xs"
              />
            </div>
          </div>
          <div className="">
            {data.map((p) => {
              const chartData = generateChartDataset(p);
              return (
                <div
                  key={p.name}
                  className="py-1 w-full"
                >
                  <header className="flex mb-4 items-center gap-3">
                    <h3 className="font-secondary mr-auto">{p.name}</h3>
                    <div className="flex-grow border-t border-[rgba(155,49,146,0.8)] border-[1px]"></div>
                  </header>

                  <div className="w-full aspect-[2] mx-auto flex justify-center relative">
                    <DoughnutChart
                      chartData={chartData}
                      options={{
                        // aspectRatio: 1,
                        radius: '80%',
                        cutout: '55%',
                        plugins: {
                          legend: {
                            position: 'right',
                            align: 'center',
                            maxWidth: 100,
                            labels: { usePointStyle: true },
                          },
                        },
                      }}
                    />

                    <button
                      className="w-fit border border-gray-500 rounded-md p-2 absolute top-0 right-0"
                      onClick={() => openModal(p.name)}
                    >
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Yearly Breakdown"
                        data-tooltip-offset={20}
                      >
                        <ChartIcon size="sm" />
                      </a>
                    </button>
                    <Tooltip
                      id="my-tooltip"
                      place="left"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
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
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
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
    labels: [...variable.items.map((p) => p.name.split(' '))],
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
  const colorSet = [
    // 'rgba(67,56,202, 0.75)',
    // 'rgba(3,105,161, 0.75)',
    // 'rgba(15,118,110,0.75)',
    // 'rgba(110,231,183,0.75)',
    'rgba(43,11,63,0.8)',
    'rgba(155,49,146,0.8)',
    'rgba(234,95,137, 0.8)',
    'rgba(247,183,163, 0.8)',
  ];
  return colorSet.slice(0, quantity);
}
