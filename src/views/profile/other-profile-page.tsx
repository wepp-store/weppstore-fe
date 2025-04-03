'use client';

import { useMyProfile } from '@/shared/apis/queries/auth';
import React from 'react';
import {
  ProfileAboutSection,
  ProfileBasicSection,
  ProfileWeppsSection,
} from './sections';
import { useFindUser } from '@/shared/apis/queries/user';
import { useParams } from 'next/navigation';

const ProfilePage = () => {
  const { userId } = useParams();
  const { data, isFetched } = useFindUser({
    params: {
      id: +userId,
    },
    enabled: !!userId,
  });

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <ProfileBasicSection profile={data} />

        {/* About */}
        <ProfileAboutSection profile={data} />

        {/* Wepps */}
        <ProfileWeppsSection profile={data} />
      </div>
    </div>
  );
};

export default ProfilePage;
