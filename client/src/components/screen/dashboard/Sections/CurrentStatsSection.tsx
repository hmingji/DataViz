import { useLatestStats } from '../../../../hooks/useLatestStats';
import StatCard from '../../../common/StatsCard';

export default function CurrentStatsSection() {
  const { data, isFetched } = useLatestStats();
  if (isFetched && data)
    return (
      <section className="w-full max-w-[90vw] xl:max-w-5xl justify-center flex border border-gray-600 rounded-xl p-4">
        <div className="w-full">
          <header className="">
            <h1 className="text-base font-bold font-secondary">
              Current stats
            </h1>
          </header>
          <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
            {data.items.map((p) => {
              return (
                <StatCard
                  key={p.name}
                  label={p.name}
                  value={p.value.toLocaleString('en-US')}
                />
              );
            })}
            <StatCard
              label="Year"
              value={data.year}
            />
          </div>
        </div>
      </section>
    );
  return <></>;
}
