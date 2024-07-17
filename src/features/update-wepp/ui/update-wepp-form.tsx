'use client';

import { useWeppDetail } from '@/shared/apis/queries/wepp';
import { FormProvider } from '@/shared/ui/hook-form';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { IWepp } from '@/shared/types';
import {
  UpdateWeppDevicesSection,
  UpdateWeppVersionSection,
  UpdateWeppBasicInfoSection,
  UpdateWeppCategoriesSection,
  UpdateWeppScreenshotsSection,
} from './form-sections';
import { WeppField } from '../types';
import { useUpdateWepp } from '../api';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertUpdateWeppForm, weppSchema } from '../utils';
import { SubmitWeppButton } from './components';

const UpdateWeppForm = () => {
  const { weppId }: { weppId: string } = useParams();

  const { data } = useWeppDetail({ weppId });

  const patchWeppMutation = useUpdateWepp<WeppField>();

  const methods = useForm<IWepp>({
    defaultValues: data,
    resolver: yupResolver(weppSchema) as any,
  });

  const { watch } = methods;

  return (
    <FormProvider methods={methods}>
      <Card>
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
  );
};

export default UpdateWeppForm;
