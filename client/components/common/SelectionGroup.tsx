import { RadioGroup } from '@headlessui/react';
import { ReactNode } from 'react';

interface Props {
  options: option[];
  value: number | undefined;
  handleOnChange: (item: number) => void;
}

export type option = {
  id: number;
  label: string;
  icon?: ReactNode;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
//TODO: add active state style
export default function SelectionGroup({
  options,
  value,
  handleOnChange,
}: Props) {
  return (
    <div>
      <RadioGroup
        value={value}
        onChange={handleOnChange}
        className="flex border rounded-md border-gray-200 max-w-fit h-[34px] divide-x-[0.1rem] overflow-hidden"
      >
        {options.map((option) => (
          <RadioGroup.Option
            key={option.id}
            value={option.id}
          >
            {({ checked }) => (
              <span
                className={classNames(
                  checked
                    ? 'bg-black text-white cursor-default font-semibold'
                    : 'text-gray-400 cursor-pointer',
                  'text-md py-2 px-2 align-middle'
                )}
              >
                {option.label}
              </span>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}
