'use client';
import { useWeppDetail } from '@/shared/apis/queries/wepp';
import { useParams, useRouter } from 'next/navigation';
import {
  WeppDetailTitle,
  WeppDetailSimilars,
  WeppDetailComments,
  WeppDetailScreenshots,
  WeppDetailAdditionalInfo,
  WeppDetailUpdateHistories,
} from './ui';
import { useAuth } from '@/shared/apis/queries/auth';
import { Link } from '@nextui-org/react';
import { Section } from '@/shared/ui/section';
import { ChevronLeft } from 'lucide-react';

// 나중에 서버 사이드에서 pre fetch하기
const WeppDetailScreen = () => {
  const { back } = useRouter();
  const { weppId }: { weppId: string } = useParams();
  const { data: wepp } = useWeppDetail({
    weppId,
    read: true,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const { data: user } = useAuth();

  return (
    <article className="flex flex-col gap-2">
      <header className="px-4 pt-4">
        <ChevronLeft size={24} onClick={back} />
      </header>

      <WeppDetailTitle wepp={wepp} />

      <WeppDetailScreenshots wepp={wepp} />

      <WeppDetailAdditionalInfo wepp={wepp} />

      {user ? (
        <WeppDetailComments />
      ) : (
        <Section>
          <h3 className="text-lg font-semibold mb-2">댓글</h3>
          <div className="flex justify-center items-center bg-gray-100 rounded-md h-20">
            <p>
              댓글을 작성하려면{' '}
              <span>
                <Link href="/login" color="primary" className="underline">
                  로그인
                </Link>
              </span>
              이 필요합니다.
            </p>
          </div>
        </Section>
      )}

      {/* <WeppDetailUpdateHistories /> */}

      {/* 비슷한 앱 추천 */}
      {/* <WeppDetailSimilars /> */}
    </article>
  );
};

export default WeppDetailScreen;
