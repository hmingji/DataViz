import { RadioGroup } from '@headlessui/react';
import { ReactNode } from 'react';

interface Props {
  options: option[];
  value: number | undefined;
  handleOnChange: (item: number) => void;
  fullWidth?: boolean;
}

export type option = {
  id: number;
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
  fullWidth = false,
}: Props) {
  return (
    <RadioGroup
      as="div"
      value={value}
      onChange={handleOnChange}
      className={`flex border rounded-md border-gray-200 min-w-fit h-[34px] divide-x-[0.1rem] overflow-hidden ${
        fullWidth && 'w-full'
      }`}
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
                  ? 'bg-black text-white cursor-default font-semibold'
                  : 'text-gray-400 cursor-pointer',
                'text-md align-middle w-full h-full px-2'
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
