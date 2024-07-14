import {
  WeppDashboardInfo,
  WeppDashboardHeader,
  WeppDashboardReviews,
  WeppDashboardBreadcrumbs,
} from './ui';

const WeppDashboardPage = () => {
  return (
    <>
      <WeppDashboardBreadcrumbs />
      <WeppDashboardHeader />
      <WeppDashboardInfo />
      <WeppDashboardReviews />
    </>
  );
};

export default WeppDashboardPage;
