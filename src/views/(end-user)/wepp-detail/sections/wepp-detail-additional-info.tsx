import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { Avatar } from '@nextui-org/react';
import React from 'react';
import { format } from 'date-fns';
import { ViewOtherDevelopersButton } from '../ui';
import Link from 'next/link';
import { PATH } from '@/shared/constants';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailAdditionalInfo = ({ wepp }: Props) => {
  const releasedDate = (() => {
    const at = wepp?.releasedAt || wepp?.updatedAt;
    if (!at) return '';
    return format(new Date(at), 'yyyy.MM.dd');
  })();

  return (
    <Section>
      <h3 className="text-lg font-semibold mb-6">개발자</h3>
      <div className="flex items-center">
        <Avatar
          showFallback
          name={wepp?.developer?.userName?.charAt(0)}
          src={wepp?.developer?.profileUrl || '/no-image.svg'}
          className="w-8 h-8"
        />
        <div className="ml-2">
          <Link href={PATH.MAIN.OTHER_PROFILE(wepp?.developerId)}>
            @
            <span className="hover:underline">{wepp?.developer?.userName}</span>
          </Link>
          {wepp?.otherDevelopers?.length ? (
            <ViewOtherDevelopersButton wepp={wepp} />
          ) : null}
        </div>

        <span className="ml-4 font-bold">·</span>
        <p className="ml-2 text-gray-500">릴리즈 {releasedDate}</p>

        <span className="ml-4 font-bold">·</span>
        <p className="ml-2 text-gray-500">버전 {wepp?.version}</p>
      </div>
    </Section>
  );
};

export default WeppDetailAdditionalInfo;
