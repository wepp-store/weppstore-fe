'use client';
import { useWeppDetail } from '@/shared/apis/queries/wepp';
import { useParams } from 'next/navigation';
import {
  WeppDetailTitle,
  WeppDetailReviews,
  WeppDetailSimilars,
  WeppDetailScreenshots,
  WeppDetailAdditionalInfo,
  WeppDetailUpdateHistories,
} from './ui';

// 나중에 서버 사이드에서 pre fetch하기
const WeppDetailScreen = () => {
  const { id: weppId }: { id: string } = useParams();
  const { data: wepp } = useWeppDetail({
    weppId,
    read: true,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return (
    <article className="flex flex-col gap-2">
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
