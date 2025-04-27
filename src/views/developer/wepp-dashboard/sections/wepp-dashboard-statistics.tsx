'use client';

import { Section } from '@/shared/ui/section';
import { BarChart2, Eye, Heart, MessageCircle } from 'lucide-react';
import { Card } from '@nextui-org/react';
import React from 'react';
import { useParams } from 'next/navigation';
import { useMineWeppDetail } from '@/shared/apis/queries/wepp';

const WeppDashboardStatistics = () => {
  const { weppId }: { weppId: string } = useParams();

  const { data: wepp } = useMineWeppDetail({ weppId });

  const { _count, viewCount, installCount } = wepp ?? {};

  return (
    <Section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex-row items-center gap-6 rounded-md shadow-none border border-gray-200 dark:border-gray-700 dark:text-gray-300">
          <Eye className="text-green-500" size={24} />
          <div>
            <p className="text-sm text-muted-foreground">총 조회 수</p>
            <p className="text-xl font-semibold">{viewCount ?? 0}회</p>
          </div>
        </Card>
        <Card className="p-4 flex-row items-center gap-6 rounded-md shadow-none border border-gray-200 dark:border-gray-700 dark:text-gray-300">
          <Heart className="text-red-500" size={24} />
          <div>
            <p className="text-sm text-muted-foreground">총 좋아요 수</p>
            <p className="text-xl font-semibold">{_count?.likes ?? 0}회</p>
          </div>
        </Card>
        <Card className="p-4 flex-row items-center gap-6 rounded-md shadow-none border border-gray-200 dark:border-gray-700 dark:text-gray-300">
          <MessageCircle className="text-purple-500" size={24} />
          <div>
            <p className="text-sm text-muted-foreground">총 댓글 수</p>
            <p className="text-xl font-semibold">{_count?.comments ?? 0}개</p>
          </div>
        </Card>
        <Card className="p-4 flex-row items-center gap-6 rounded-md shadow-none border border-gray-200 dark:border-gray-700 dark:text-gray-300">
          <BarChart2 className="text-blue-500" size={24} />
          <div>
            <p className="text-sm text-muted-foreground">
              총 설치 버튼 클릭 수
            </p>
            <p className="text-xl font-semibold">{installCount ?? 0}회</p>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default WeppDashboardStatistics;
