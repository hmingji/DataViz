import DonationChartSection from './DonationChartSection';
import NewDonorChartSection from './NewDonorChartSection';
import RecentRatioSection from './RecentRatioSection';

export default function DashboardScreen() {
  return (
    <div className="grid grid-flow-row gap-16 justify-items-center">
      <DonationChartSection />
      <NewDonorChartSection />
      <RecentRatioSection />
    </div>
  );
}
