import { ReactNode } from 'react';

interface Props {
  label: string;
  icon?: ReactNode;
  handleOnClick: () => void;
}

export default function Button({ label, icon, handleOnClick }: Props) {
  return (
    <button
      onClick={handleOnClick}
      className="inline-flex items-center border border-gray-500 rounded-md gap-1 px-2 py-1 hover:border-gray-900"
    >
      {icon} <span className="text-xs">{label}</span>
    </button>
  );
}
