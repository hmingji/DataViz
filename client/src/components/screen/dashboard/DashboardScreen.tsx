import DonationChartSection from './DonationChartSection';
import NewDonorChartSection from './NewDonorChartSection';

export default function DashboardScreen() {
  return (
    <div className="grid grid-flow-row gap-16 justify-items-center">
      <DonationChartSection />
      <NewDonorChartSection />
    </div>
  );
}
