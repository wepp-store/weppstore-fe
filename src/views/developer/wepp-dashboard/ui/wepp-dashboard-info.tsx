'use client';

import { useWeppDetail } from '@/shared/apis/queries/wepp';
import { formatCategories, weppStatusToText } from '@/shared/utils';
import { Section } from '@/shared/ui/section';
import {
  Link,
  Card,
  Button,
  Divider,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

const WeppDashboardInfo = () => {
  const pathname = usePathname();
  const { id: weppId }: { id: string } = useParams();

  const { data: wepp } = useWeppDetail({ weppId });

  return (
    <Section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* <!-- 앱 정보 카드 --> */}
      <Card>
        <CardHeader className="text-xl font-semibold">앱 정보</CardHeader>
        <Divider />
        <CardBody className="space-y-2">
          <dl className="flex justify-between">
            <dt className="font-medium">앱 ID:</dt>
            <dd>{wepp?.id}</dd>
          </dl>
          <dl className="flex justify-between">
            <dt className="font-medium">현재 버전:</dt>
            <dd>{wepp?.version}</dd>
          </dl>
          <dl className="flex justify-between">
            <dt className="font-medium">카테고리:</dt>
            <dd>{formatCategories(wepp?.categories)}</dd>
          </dl>
          <dl className="flex justify-between">
            <dt className="font-medium">상태:</dt>
            <dd className="text-green-500">{weppStatusToText(wepp?.status)}</dd>
          </dl>
        </CardBody>
        <CardFooter className="w-full flex justify-end">
          <Button
            color="primary"
            href={`${pathname}/info`}
            as={Link}
            showAnchorIcon
            variant="solid"
          >
            정보 수정
          </Button>
        </CardFooter>
      </Card>

      {/* <!-- 통계 카드 --> */}
      <Card>
        <CardHeader className="text-xl font-semibold">통계</CardHeader>
        <Divider />
        <CardBody className="space-y-2">
          <dl className="flex justify-between">
            <dt className="font-medium">총 조회수:</dt>
            <dd>{wepp?.views}</dd>
          </dl>
          <dl className="flex justify-between">
            <dt className="font-medium">이번 달 조회수:</dt>
            <dd>1,234</dd>
          </dl>
          <dl className="flex justify-between">
            <dt className="font-medium">평균 평점:</dt>
            <dd>4.5</dd>
          </dl>
          <dl className="flex justify-between">
            <dt className="font-medium">활성 사용자:</dt>
            <dd>5,678</dd>
          </dl>
        </CardBody>
        <CardFooter className="w-full flex justify-end">
          <Button color="success">상세 통계 보기</Button>
        </CardFooter>
      </Card>

      {/* <!-- 버전 업데이트 카드 --> */}
      <Card>
        <CardHeader className="text-xl font-semibold">버전 업데이트</CardHeader>
        <Divider />
        <form>
          <CardBody className="space-y-4">
            <div>
              <label
                htmlFor="newVersion"
                className="block text-sm font-medium text-gray-700"
              >
                새 버전
              </label>
              <input
                type="text"
                id="newVersion"
                name="newVersion"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="releaseNotes"
                className="block text-sm font-medium text-gray-700"
              >
                릴리스 노트
              </label>
              <textarea
                id="releaseNotes"
                name="releaseNotes"
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              ></textarea>
            </div>
          </CardBody>
          <CardFooter className="w-full flex justify-end">
            <Button type="submit" color="secondary">
              업데이트 제출
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Section>
  );
};

export default WeppDashboardInfo;
