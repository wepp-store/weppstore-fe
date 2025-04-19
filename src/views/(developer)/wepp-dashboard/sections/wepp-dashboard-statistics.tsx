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

  const { views, _count } = wepp ?? {};

  return (
    <Section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex-row items-center gap-6 border border-gray-200 rounded-md shadow-none">
          <Eye className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-muted-foreground">총 조회 수</p>
            <p className="text-xl font-semibold">{views ?? 0}회</p>
          </div>
        </Card>
        <Card className="p-4 flex-row items-center gap-6 border border-gray-200 rounded-md shadow-none">
          <Heart className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">총 좋아요 수</p>
            <p className="text-xl font-semibold">{_count?.likes ?? 0}회</p>
          </div>
        </Card>
        <Card className="p-4 flex-row items-center gap-6 border border-gray-200 rounded-md shadow-none">
          <MessageCircle className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-muted-foreground">총 댓글 수</p>
            <p className="text-xl font-semibold">{_count?.comments ?? 0}개</p>
          </div>
        </Card>
        <Card className="p-4 flex-row items-center gap-6 border border-gray-200 rounded-md shadow-none">
          <BarChart2 className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-muted-foreground">
              총 설치 버튼 클릭 수
            </p>
            <p className="text-xl font-semibold">
              <del className="text-gray-600">작업 중입니다.</del>
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default WeppDashboardStatistics;
