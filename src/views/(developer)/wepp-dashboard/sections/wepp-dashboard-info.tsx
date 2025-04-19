'use client';

import { useMineWeppDetail } from '@/shared/apis/queries/wepp';
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
  const { weppId }: { weppId: string } = useParams();

  const { data: wepp } = useMineWeppDetail({ weppId });

  const { id, version, categories, status, views, _count } = wepp || {};

  return (
    // <Section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Section>
      {/* <!-- 앱 정보 카드 --> */}
      <Card className="border shadow-none rounded-md">
        <CardHeader className="text-xl font-semibold">앱 정보</CardHeader>
        <Divider />
        <CardBody className="space-y-2">
          <dl className="flex justify-between">
            <dt className="font-medium">앱 ID:</dt>
            <dd>{id}</dd>
          </dl>
          <dl className="flex justify-between">
            <dt className="font-medium">현재 버전:</dt>
            <dd>{version}</dd>
          </dl>
          <dl className="flex justify-between">
            <dt className="font-medium">카테고리:</dt>
            <dd>{formatCategories(categories)}</dd>
          </dl>
          <dl className="flex justify-between">
            <dt className="font-medium">상태:</dt>
            <dd className="text-green-500">{weppStatusToText(status)}</dd>
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
    </Section>
  );
};

export default WeppDashboardInfo;
