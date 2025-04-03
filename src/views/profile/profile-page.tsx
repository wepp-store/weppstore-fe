'use client';

import { useMyProfile } from '@/shared/apis/queries/auth';
import React from 'react';
import {
  ProfileAboutSection,
  ProfileBasicSection,
  ProfileWeppsSection,
} from './sections';

const ProfilePage = () => {
  const { data, isFetched } = useMyProfile();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile Header */}
      <ProfileBasicSection profile={data} isMine />

      {/* About */}
      <ProfileAboutSection profile={data} />

      {/* Wepps */}
      <ProfileWeppsSection profile={data} />
    </div>
  );
};

export default ProfilePage;
