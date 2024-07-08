import {
  WeppDashboardBreadcrumbs,
  WeppDashboardHeader,
  WeppDashboardInfo,
  WeppDashboardReviews,
} from '@/sections/developer/wepp';
import React from 'react';

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
