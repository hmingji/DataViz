import { Menu } from '@headlessui/react';

interface Props {
  buttonLabel: string;
  menuItems: string[];
  handleItemOnClick: () => void;
  //button icon
}

export default function DropdownMenu({
  buttonLabel,
  menuItems,
  handleItemOnClick,
}: Props) {
  return (
    <Menu
      as="div"
      className="relative inline-block"
    >
      <Menu.Button>
        {({ open }) => (
          <button
            className={`justify-center border border-gray-200 rounded-md px-2 py-1 text-md font-semibold hover:border-gray-500 ${
              open && 'border-gray-500'
            }`}
          >
            {buttonLabel}
          </button>
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
                  } px-2 py-1 font-semibold w-full text-left rounded-md`}
                  onClick={handleItemOnClick}
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
