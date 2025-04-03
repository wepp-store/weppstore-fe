'use client';

import { useSession } from '@/shared/apis/queries/auth';
import React from 'react';
import {
  ProfileAboutSection,
  ProfileBasicSection,
  ProfileWeppsSection,
} from './sections';
import { useFindUser } from '@/shared/apis/queries/user';
import { redirect, useParams } from 'next/navigation';
import { PATH } from '@/shared/constants';

const ProfilePage = () => {
  const { userId } = useParams();
  const { user } = useSession();

  const isMine = user?.id === +userId;

  const { data, isFetched } = useFindUser({
    params: {
      id: +userId,
    },
    enabled: !!userId && !isMine,
  });

  if (isMine) {
    return redirect(PATH.MAIN.PROFILE);
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile Header */}
      <ProfileBasicSection profile={data} />

      {/* About */}
      <ProfileAboutSection profile={data} />

      {/* Wepps */}
      <ProfileWeppsSection profile={data} />
    </div>
  );
};

export default ProfilePage;
