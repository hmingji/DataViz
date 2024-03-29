import { Listbox } from '@headlessui/react';
import { CheckIcon } from './Icons/CheckIcon';
import { ChevronUpDown } from './Icons/ChevronUpDown';
import { option } from './SelectionGroup';

interface Props {
  buttonLabel: string;
  options: option[];
  handleOnChange: (ids: number[]) => void;
  value: number[];
  optionWithIcon: boolean;
}

export default function MultiSelectListBox({
  buttonLabel,
  options,
  handleOnChange,
  value,
  optionWithIcon,
}: Props) {
  const hasSelected = value.length > 0;
  return (
    <Listbox
      value={value}
      onChange={handleOnChange}
      multiple
      className="relative inline-block w-full md:w-[13rem]"
      as="div"
    >
      <Listbox.Button
        className="w-full inline-flex items-center justify-between border border-gray-500 rounded-md py-1 px-2 text-base font-semibold hover:border-gray-900"
        aria-label="listbox-button"
      >
        <span className="grow md:text-left">{buttonLabel}</span>
        <ChevronUpDown size="md" />
      </Listbox.Button>

      {hasSelected && (
        <span
          className="absolute top-0 left-0 inline-flex items-center justify-center px-2 py-1 rounded-full bg-cyan-500 text-xs text-gray-100 font-bold transform -translate-x-1/2 -translate-y-1/2"
          aria-label="selected-quantity"
          role="badge"
        >
          {value.length}
        </span>
      )}
      <Listbox.Options className="w-full absolute left-0 origin-top-left rounded-md shadow-lg px-1 py-1 bg-white z-50">
        {options.map((option) => (
          <Listbox.Option
            key={option.id}
            value={option.id}
          >
            {({ selected, active }) => (
              <div
                className={`w-full inline-flex justify-between items-center px-2 py-1 rounded-md cursor-default ${
                  active && 'bg-gray-200'
                }`}
              >
                {optionWithIcon && option.icon}
                {option.label}
                {selected && (
                  <span>
                    <CheckIcon size="md" />
                  </span>
                )}
              </div>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
