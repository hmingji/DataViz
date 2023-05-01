import { RadioGroup } from '@headlessui/react';
import { ReactNode } from 'react';

interface Props {
  options: option[];
  value: number;
  handleOnChange: (item: number) => void;
}

export type option = {
  id: number | string;
  label: string;
  icon?: ReactNode;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SelectionGroup({
  options,
  value,
  handleOnChange,
}: Props) {
  return (
    <RadioGroup
      as="div"
      value={value}
      onChange={handleOnChange}
      className="flex border rounded-md border-gray-500 h-[34px] divide-x-[0.1rem] divide-gray-500 overflow-hidden w-full md:w-fit"
    >
      {options.map((option) => (
        <RadioGroup.Option
          key={option.id}
          value={option.id}
          className="grow"
        >
          {({ checked }) => (
            <button
              className={classNames(
                checked
                  ? 'bg-black text-white cursor-default font-semibold border-black border'
                  : 'text-gray-700 cursor-pointer',
                'text-base align-middle w-full h-full px-2'
              )}
            >
              {option.label}
            </button>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
