import {
  WeppDashboardInfo,
  WeppDashboardHeader,
  WeppDashboardBreadcrumbs,
  WeppDashboardStatistics,
} from './sections';

const WeppDashboardPage = () => {
  return (
    <>
      <WeppDashboardBreadcrumbs />
      <WeppDashboardHeader />
      <WeppDashboardStatistics />
      <WeppDashboardInfo />
    </>
  );
};

export default WeppDashboardPage;
