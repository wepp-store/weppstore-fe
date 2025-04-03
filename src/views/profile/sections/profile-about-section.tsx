import { IUser } from '@/shared/types';
import { Card, CardBody } from '@nextui-org/react';
import React from 'react';

interface Props {
  profile: IUser | undefined;
}

const ProfileAboutSection = ({ profile }: Props) => {
  return (
    <Card className="mt-4 shadow-sm border">
      <CardBody className="p-6">
        <h2 className="text-xl font-bold mb-4">소개</h2>
        <p className="text-gray-700">
          {profile?.description || '소개가 없습니다.'}
        </p>
      </CardBody>
    </Card>
  );
};

export default ProfileAboutSection;
