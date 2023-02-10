import DashboardScreen from '@/components/screens/dashboard/DashboardScreen';
import HeaderLayout from '@/layouts/HeaderLayout';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Blood Donation Malaysia - Interactive Chart Visualization</title>
        <meta
          name="description"
          content="Visualize variety of statistics related to blood donation in Malaysia."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <HeaderLayout>
        <DashboardScreen />
      </HeaderLayout>
    </>
  );
}
