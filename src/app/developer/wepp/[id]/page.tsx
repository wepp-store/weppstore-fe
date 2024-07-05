import {
  WeppDashboardHeader,
  WeppDashboardInfo,
  WeppDashboardReviews,
} from '@/sections/developer/wepp';
import React from 'react';

const WeppDetail = () => {
  return (
    <>
      <WeppDashboardHeader />
      <WeppDashboardInfo />
      <WeppDashboardReviews />
    </>
  );
};

export default WeppDetail;
