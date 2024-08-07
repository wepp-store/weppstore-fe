import {
  WeppDashboardInfo,
  WeppDashboardHeader,
  WeppDashboardBreadcrumbs,
} from './sections';

const WeppDashboardPage = () => {
  return (
    <>
      <WeppDashboardBreadcrumbs />
      <WeppDashboardHeader />
      <WeppDashboardInfo />
    </>
  );
};

export default WeppDashboardPage;
