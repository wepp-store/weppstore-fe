import {
  WeppDashboardBreadcrumbs,
  WeppDashboardHeader,
  WeppDashboardInfo,
  WeppDashboardReviews,
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
