import { RHFInput, RHFTextArea } from '@/shared/ui/hook-form';
import { Section } from '@/shared/ui/section';
import { Image } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useUploadWeppImage } from '../api';
import {
  VerifyWeppButton,
  WeppUrlChangeButton,
  DomainOwnershipInfoButton,
} from '../ui';
import { Callout } from '@/shared/ui/callout';

const UpdateWeppBasicInfoSection = () => {
  const { watch, setValue } = useFormContext();

  const uploadImageMutation = useUploadWeppImage({ type: 'logo' });

  const { logo, isVerified } = watch();

  const onUploadLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImageMutation.mutate(file, {
      onSuccess: (data) => {
        setValue('logo', data.url);
      },
      onSettled: () => {
        e.target.value = '';
      },
    });
  };

  return (
    <Section className="flex flex-col gap-4">
      {!isVerified && (
        <Callout color="danger">도메인 소유권을 인증해주세요.</Callout>
      )}

      <h2 className="text-xl font-semibold mb-4">기본 정보</h2>

      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-1 flex flex-col gap-4">
          <RHFInput
            name="name"
            label="앱 이름"
            type="text"
            placeholder="앱 이름"
          />
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-end">
              <RHFInput
                name="url"
                label="앱 URL"
                type="text"
                placeholder="앱 URL"
                isReadOnly={isVerified}
              />
              {isVerified ? <WeppUrlChangeButton /> : <VerifyWeppButton />}
            </div>

            <div className="flex justify-end">
              <DomainOwnershipInfoButton />
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <label htmlFor="wepp_logo">
            <Image
              isZoomed
              src={logo}
              alt="logo"
              width={200}
              className="aspect-square border border-gray-200"
              radius="full"
              fallbackSrc="/no-image.svg"
            />
            <input
              className="hidden"
              id="wepp_logo"
              type="file"
              accept="image/*"
              onChange={onUploadLogo}
            />
          </label>
        </div>
      </div>

      <RHFTextArea
        name="description"
        label="앱 설명"
        minRows={4}
        maxRows={100}
        placeholder="앱에 대한 상세 설명을 입력하세요."
      />
    </Section>
  );
};

export default UpdateWeppBasicInfoSection;
