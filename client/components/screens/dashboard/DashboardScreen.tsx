import DonationChartSession from './DonationChartSession';
import NewDonorChartSession from './NewDonorChartSession';

export default function DashboardScreen() {
  return (
    <div className="grid grid-flow-row gap-16 justify-items-center">
      <DonationChartSession />
      <NewDonorChartSession />
    </div>
  );
}
