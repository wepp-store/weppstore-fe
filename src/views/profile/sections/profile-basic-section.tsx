import {
  UpdateProfileFormOpenButton,
  UpdateProfileImage,
} from '@/features/update-profile';
import { IUser } from '@/shared/types';
import { Card, CardBody, Skeleton } from '@nextui-org/react';
import React from 'react';

interface Props {
  profile: IUser | undefined;
}

const ProfileBasicSection = ({ profile }: Props) => {
  const isFetched = !!profile;

  return (
    <Card className="mt-4">
      <CardBody className="p-6 flex-row gap-8">
        <UpdateProfileImage src={profile?.profileUrl} />
        <div className="grow flex flex-col">
          <h1 className="text-2xl font-bold">{profile?.userName}</h1>
          <p className="text-gray-600 grow">{profile?.email}</p>
          <div className="mt-4 flex justify-end gap-4 self-end">
            <Skeleton isLoaded={isFetched} className="rounded-lg">
              {!!profile && <UpdateProfileFormOpenButton profile={profile} />}
            </Skeleton>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileBasicSection;
