import { PATH } from '@/shared/constants';
import { IUser } from '@/shared/types';
import { Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

interface Props {
  profile: IUser | undefined;
}

const ProfileWeppsSection = ({ profile }: Props) => {
  const wepps = profile?.wepps ?? [];

  if (wepps.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4 shadow-sm border dark:border-gray-700">
      <CardBody className="p-6">
        <h2 className="text-xl font-bold mb-4">만든 앱</h2>
        <div className="flex flex-col gap-1">
          {wepps.map((wepp) => (
            <Link
              key={wepp.id}
              className="flex items-center p-2 rounded-lg hover:-translate-y-1 transition-transform duration-200"
              href={PATH.MAIN.WEPP_DETAIL(wepp.id)}
            >
              <img
                src={wepp.logo || '/no-image.svg'}
                alt={wepp.name}
                className="w-16 h-16 rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{wepp.name}</h3>
                <p className="text-gray-500">{wepp.tagLine}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileWeppsSection;
