'use client';

import {
  UpdateProfileFormOpenButton,
  UpdateProfileImage,
} from '@/features/update-profile';
import { useMyProfile } from '@/shared/apis/queries/auth';
import { Card, CardBody, Image, Skeleton } from '@nextui-org/react';
import React from 'react';

const ProfilePage = () => {
  const { data, isFetched } = useMyProfile();

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <Card className="mt-4">
          <CardBody className="p-6 flex-row gap-8">
            <UpdateProfileImage src={data?.profileUrl} />
            <div className="grow flex flex-col">
              <h1 className="text-2xl font-bold">{data?.userName}</h1>
              <p className="text-gray-600 grow">{data?.email}</p>
              <div className="flex justify-end gap-4 self-end">
                <Skeleton isLoaded={isFetched} className="rounded-lg">
                  {!!data && <UpdateProfileFormOpenButton profile={data} />}
                </Skeleton>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* About */}
        <Card className="mt-4">
          <CardBody className="p-6">
            <h2 className="text-xl font-bold mb-4">소개</h2>
            <p className="text-gray-700">
              {data?.description || '소개가 없습니다.'}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
