import {
  WeppDashboardInfo,
  WeppDashboardHeader,
  WeppDashboardComments,
  WeppDashboardBreadcrumbs,
} from './sections';

const WeppDashboardPage = () => {
  return (
    <>
      <WeppDashboardBreadcrumbs />
      <WeppDashboardHeader />
      <WeppDashboardInfo />
      <WeppDashboardComments />
    </>
  );
};

export default WeppDashboardPage;
