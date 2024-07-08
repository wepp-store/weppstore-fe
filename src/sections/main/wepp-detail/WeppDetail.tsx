'use client';
import { useWeppDetail } from '@/_apis/queries/wepp';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import WeppDetailTitle from './WeppDetailTitle';
import WeppDetailScreenshots from './WeppDetailScreenshots';
import WeppDetailAdditionalInfo from './WeppDetailAdditionalInfo';
import WeppDetailReviews from './WeppDetailReviews';
import WeppDetailSimilars from './WeppDetailSimilars';
import WeppDetailUpdateHistories from './WeppDetailUpdateHistories';

const WeppDetailScreen = () => {
  const { id: weppId }: { id: string } = useParams();
  const { data: wepp } = useWeppDetail({ weppId });

  return (
    <article className="flex flex-col gap-8">
      <WeppDetailTitle wepp={wepp} />

      <WeppDetailScreenshots wepp={wepp} />

      <WeppDetailAdditionalInfo wepp={wepp} />

      <WeppDetailReviews />

      <WeppDetailUpdateHistories />

      <WeppDetailUpdateHistories />

      {/* 비슷한 앱 추천 */}
      <WeppDetailSimilars />
    </article>
  );
};

export default WeppDetailScreen;
