import {
  WeppDashboardInfo,
  WeppDashboardHeader,
  WeppDashboardReviews,
  WeppDashboardBreadcrumbs,
} from '@/views/developer/wepp-dashboard';

const WeppDetail = () => {
  return (
    <>
      <WeppDashboardBreadcrumbs />
      <WeppDashboardHeader />
      <WeppDashboardInfo />
      <WeppDashboardReviews />
    </>
  );
};

export default WeppDetail;
