'use client';

import { useUpdateWepp, useUploadWeppImage } from '@/_apis/queries/wepp';
import { Card } from '@/components/card';
import { FormProvider, RHFInput, RHFTextArea } from '@/components/hook-form';
import React from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {
  name: '',
  description: '',
  logo: '',
  status: 'DRAFT',
  version: '0.0.0',
  screenshots: [],
};

const WeppInfoForm = () => {
  const patchWeppMutation = useUpdateWepp();

  const uploadImageMutation = useUploadWeppImage();

  const methods = useForm({ defaultValues });

  const { handleSubmit, setValue } = methods;

  const onSubmit = (data: any) => {
    // signUp
    delete data.id;

    patchWeppMutation.mutate({
      ...defaultValues,
      ...data,
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card
        className="
        bg-white
        shadow-md
        rounded
        px-8
        pt-6
        pb-8
        mb-4
      "
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RHFInput
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              label="앱 이름"
              type="text"
              placeholder="앱 이름"
            />
            <RHFInput
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="url"
              label="앱 URL"
              type="text"
              placeholder="앱 URL"
            />
          </div>
        </div>

        <div className="mb-6">
          <RHFTextArea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            label="앱 설명"
            rows={4}
            placeholder="앱에 대한 상세 설명을 입력하세요."
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">카테고리 및 가격</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                카테고리
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
              >
                <option>게임</option>
                <option>생산성</option>
                <option>교육</option>
                <option>엔터테인먼트</option>
                <option>소셜 네트워킹</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">미디어</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="logo"
            >
              앱 아이콘
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="logo"
              type="file"
              accept="image/*"
              onChange={(e: any) => {
                const file = e.target.files[0];
                if (!file) return;
                uploadImageMutation.mutate(file, {
                  onSuccess: (data) => {
                    setValue('logo', `http://localhost:8000${data.url}`);
                  },
                });
              }}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="screenshots"
            >
              스크린샷 (최대 5개)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="screenshots"
              type="file"
              accept="image/*"
              multiple
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">버전 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="version"
              >
                버전
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="version"
                type="text"
                placeholder="1.0.0"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="buildNumber"
              >
                빌드 번호
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="buildNumber"
                type="number"
                placeholder="1"
              />
            </div>
          </div>
        </div>

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

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            앱 제출
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            // type="button"
          >
            임시 저장
          </button>
        </div>
      </Card>
    </FormProvider>
  );
};

export default WeppInfoForm;
