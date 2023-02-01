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
      className="relative inline-block"
    >
      <Menu.Button>
        {({ open }) => (
          <span
            className={`flex items-center justify-between min-w-[8rem] border border-gray-200 rounded-md px-2 py-1 text-md font-semibold hover:border-gray-500 ${
              open && 'border-gray-500'
            }`}
          >
            {selectedItem ? selectedItem : buttonLabel}
            {buttonIcon}
          </span>
        )}
      </Menu.Button>

      <Menu.Items className="min-w-[8rem] absolute left-0 origin-top-left rounded-md shadow-lg">
        <div className="px-1 py-1">
          {menuItems.map((item) => (
            <Menu.Item key={item}>
              {({ active }) => (
                <button
                  className={`${
                    active && 'bg-gray-200'
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
