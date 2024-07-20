'use client';

import { useMyProfile } from '@/shared/apis/queries/auth';
import React from 'react';
import { ProfileAboutSection, ProfileBasicSection } from './sections';

const ProfilePage = () => {
  const { data, isFetched } = useMyProfile();

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <ProfileBasicSection profile={data} />

        {/* About */}
        <ProfileAboutSection profile={data} />
      </div>
    </div>
  );
};

export default ProfilePage;
