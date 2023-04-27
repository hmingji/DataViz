import HeaderLayout from './layouts/HeaderLayout';
import DashboardScreen from './components/screen/dashboard/DashboardScreen';

function App() {
  return (
    <div className="bg-gradient-to-b from-red-100 to-amber-100">
      <HeaderLayout>
        <DashboardScreen />
      </HeaderLayout>
    </div>
  );
}

export default App;
