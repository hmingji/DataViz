import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';

interface Props {
  buttonLabel: string;
  menuItems: string[];
  handleOnClick: (item: string) => void;
  buttonIcon?: ReactNode;
  selectedItem: string | undefined;
}
//TODO: allow width variantion and font color diff for srlected items
export default function DropdownMenu({
  buttonLabel,
  menuItems,
  handleOnClick,
  buttonIcon,
  selectedItem,
}: Props) {
  return (
    <Menu
      as="div"
      className={`relative inline-block w-full md:w-[13rem]`}
    >
      <Menu.Button className="w-full">
        {({ open }) => (
          <span
            className={`flex items-center justify-between w-full border border-gray-500 rounded-md px-2 py-1 text-md font-semibold hover:border-gray-900 ${
              open && 'border-gray-500'
            }`}
          >
            <span className={`grow md:text-left`}>
              {selectedItem ? selectedItem : buttonLabel}{' '}
            </span>
            {buttonIcon}
          </span>
        )}
      </Menu.Button>

      <Menu.Items className="w-full absolute left-0 origin-top-left rounded-md shadow-lg bg-white z-50">
        <div className="px-1 py-1">
          {menuItems.map((item) => (
            <Menu.Item key={item}>
              {({ active }) => (
                <button
                  className={`${active && 'bg-gray-200'} ${
                    selectedItem === item && 'font-semibold cursor-default'
                  } px-2 py-1 w-full text-left rounded-md`}
                  onClick={() => handleOnClick(item)}
                >
                  {item}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}
