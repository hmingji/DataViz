import { Tab } from '@headlessui/react';

interface Props {
  optionLabels: string[];
  handleOnClick: (item: string) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function TabSelection({ optionLabels, handleOnClick }: Props) {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {optionLabels.map((label) => (
            <Tab
              key={label}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
              onClick={() => handleOnClick(label)}
            >
              {label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
