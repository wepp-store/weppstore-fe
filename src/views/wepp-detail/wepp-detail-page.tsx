'use client';
import { useWeppDetail } from '@/shared/apis/queries/wepp';
import { useParams, useRouter } from 'next/navigation';
import {
  WeppDetailTitle,
  WeppDetailSubInfo,
  WeppDetailComments,
  WeppDetailScreenshots,
  WeppDetailDescription,
  WeppDetailAdditionalInfo,
} from './sections';
import { useSession } from '@/shared/apis/queries/auth';
import { Divider, Link } from '@nextui-org/react';
import { Section } from '@/shared/ui/section';
import { ChevronLeft } from 'lucide-react';
import { ELEMENT_ID, PATH } from '@/shared/constants';

const WeppDetailScreen = () => {
  const { replace } = useRouter();
  const { weppId }: { weppId: string } = useParams();
  const { data: wepp } = useWeppDetail({ weppId });

  const { isLoggedIn } = useSession();

  return (
    <article className="flex flex-col gap-2">
      <header className="px-4 pt-4">
        <ChevronLeft
          size={24}
          onClick={() => replace(PATH.MAIN.WEPPS)}
          role="button"
          aria-label="뒤로가기"
        />
      </header>

      <WeppDetailTitle wepp={wepp} />

      {/* <WeppDetailSubInfo wepp={wepp} /> */}

      <WeppDetailScreenshots wepp={wepp} />

      <WeppDetailDescription wepp={wepp} />

      <Divider className="my-4" />

      <WeppDetailAdditionalInfo wepp={wepp} />

      <Divider className="my-4" />

      {isLoggedIn ? (
        <WeppDetailComments />
      ) : (
        <Section>
          <h3 className="text-lg font-semibold mb-2">댓글</h3>
          <div className="flex justify-center items-center bg-gray-100 rounded-md h-20">
            <p>
              댓글을 작성하려면{' '}
              <span id={ELEMENT_ID.CREATE_COMMENT_FIELD}>
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
