import StatCard from '../../common/StatsCard';
import CurrentStatsSection from './Sections/CurrentStatsSection';
import DonationChartSection from './Sections/DonationChartSection';
import NewDonorAgeGroupSection from './Sections/NewDonorAgeGroupSection';
import NewDonorChartSection from './Sections/NewDonorChartSection';
import RecentRatioSection from './Sections/RecentRatioSection';

export default function DashboardScreen() {
  return (
    <div className="w-full max-w-[90vw] xl:max-w-5xl mx-auto">
      <div className="grid grid-flow-row lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <CurrentStatsSection />
          <DonationChartSection />
          <NewDonorChartSection />
          <NewDonorAgeGroupSection />
        </div>
        <div>
          <RecentRatioSection />
        </div>
      </div>
    </div>
  );
}
