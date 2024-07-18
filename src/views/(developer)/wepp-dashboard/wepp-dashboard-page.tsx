import {
  WeppDashboardInfo,
  WeppDashboardHeader,
  WeppDashboardReviews,
  WeppDashboardBreadcrumbs,
} from './sections';

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
