'use client';

import { CustomBreadcrumbs } from '@/shared/ui/custom-breadcrumbs';
import { Section } from '@/shared/ui/section';
import { useParams } from 'next/navigation';
import React from 'react';
import { convertUpdateWeppForm, type WeppField, weppSchema } from './lib';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMineWeppDetail } from '@/shared/apis/queries/wepp';
import { useUpdateWepp } from './api';
import { IWepp } from '@/shared/types';
import { FormProvider } from '@/shared/ui/hook-form';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { SubmitWeppButton } from './ui';
import {
  UpdateWeppDevicesSection,
  UpdateWeppVersionSection,
  UpdateWeppBasicInfoSection,
  UpdateWeppCategoriesSection,
  UpdateWeppScreenshotsSection,
  UpdateWeppOtherDevelopersSection,
} from './sections';

const WeppInfoPage = () => {
  const { weppId }: { weppId: string } = useParams();

  const { data } = useMineWeppDetail({ weppId });

  const patchWeppMutation = useUpdateWepp<WeppField>();

  const methods = useForm<IWepp>({
    defaultValues: data,
    resolver: yupResolver(weppSchema) as any,
  });

  const { watch } = methods;

  return (
    <>
      <Section className="pb-0">
        <CustomBreadcrumbs
          paths={[
            { name: '홈', path: '/developer' },
            { name: '앱 대시보드', path: `/developer/wepp/${weppId}` },
            { name: '앱 정보', path: `/developer/wepp/${weppId}/info` },
          ]}
        />
      </Section>

      <Section className="pt-0">
        <FormProvider methods={methods}>
          <Card className="border-none shadow-none rounded-md">
            <CardHeader className="flex justify-between items-center p-4">
              <h1 className="text-3xl font-bold text-gray-800">앱 정보</h1>

              <div className="flex items-center gap-4">
                <Button
                  color="primary"
                  variant="bordered"
                  isLoading={patchWeppMutation.isPending}
                  onPress={() =>
                    patchWeppMutation.mutate(convertUpdateWeppForm(watch()))
                  }
                >
                  {patchWeppMutation.isPending || '임시 저장'}
                </Button>
                <SubmitWeppButton />
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-4 gap-8">
              <UpdateWeppBasicInfoSection />

              <UpdateWeppCategoriesSection />

              <UpdateWeppDevicesSection />

              <UpdateWeppScreenshotsSection />

              <UpdateWeppVersionSection />

              <UpdateWeppOtherDevelopersSection />

              <Divider />

              {/* <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="privacyPolicyUrl"
            >
              개인정보 처리방침 URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="privacyPolicyUrl"
              type="url"
              placeholder="https://example.com/privacy-policy"
            />
          </div> */}
            </CardBody>
          </Card>
        </FormProvider>
      </Section>
    </>
  );
};

export default WeppInfoPage;
