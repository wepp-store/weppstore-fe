'use client';

import {
  useWeppDetail,
  useUpdateWepp,
  useUploadWeppImage,
} from '@/shared/apis/queries/wepp';
import { FormProvider } from '@/shared/ui/hook-form';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import {
  BasicInfoSection,
  CategoriesSection,
  ScreenshotsSection,
  VersionSection,
} from './form-sections';
import { WeppField } from './types';

const defaultValues: WeppField = {
  url: '',
  name: '',
  description: '',
  logo: '',
  status: 'DRAFT',
  version: '0.0.0',
  screenshots: [],
  categories: [],
};

const WeppInfoForm = () => {
  const { id: weppId }: { id: string } = useParams();

  const { data, isFetched } = useWeppDetail({ weppId });

  const patchWeppMutation = useUpdateWepp();

  const methods = useForm<WeppField>({ defaultValues });

  const { handleSubmit, setValue, reset, watch } = methods;

  const values = watch();

  const onSubmit = (data: WeppField) => {
    patchWeppMutation.mutate(data);
  };

  React.useEffect(() => {
    if (!isFetched) return;
    reset({
      name: data?.name,
      url: data?.url,
      description: data?.description,
      logo: data?.logo,
      status: data?.status,
      version: data?.version,
      screenshots: data?.screenshots || [],
      categories: data?.categories || [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold text-gray-800">앱 정보</h1>

          <div className="flex items-center gap-4">
            <Button
              color="primary"
              variant="bordered"
              type="submit"
              // type="button"
            >
              임시 저장
            </Button>
            <Button color="primary" type="submit">
              앱 제출
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 gap-8">
          <BasicInfoSection />

          <CategoriesSection />

          <ScreenshotsSection />

          <VersionSection />

          <div className="mb-6">
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
          </div>
        </CardBody>
      </Card>
    </FormProvider>
  );
};

export default WeppInfoForm;
