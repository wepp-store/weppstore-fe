import {
  WeppDashboardHeader,
  WeppDashboardBreadcrumbs,
  WeppDashboardStatistics,
  WeppDashboardChart,
} from './sections';

const WeppDashboardPage = () => {
  return (
    <>
      <WeppDashboardBreadcrumbs />
      <WeppDashboardHeader />
      <WeppDashboardStatistics />
      <WeppDashboardChart />
    </>
  );
};

export default WeppDashboardPage;
