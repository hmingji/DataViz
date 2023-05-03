interface Props {
  label: string;
  value: number | string;
}

export default function StatsCard({ label, value }: Props) {
  return (
    <div className="w-full max-w-[200px] py-4">
      <h3 className="text-4xl font-medium leading-6 text-gray-900 mb-2">
        {value}
      </h3>
      <p className="text-base font-medium text-gray-500">{label}</p>
    </div>
  );
}
