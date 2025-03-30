import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { Avatar } from '@nextui-org/react';
import React from 'react';
import { format } from 'date-fns';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailAdditionalInfo = ({ wepp }: Props) => {
  const updatedDate = (() => {
    const at = wepp?.updatedAt || wepp?.createdAt;
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
        <p className="ml-2">@{wepp?.developer?.userName}</p>

        <span className="ml-4 font-bold">·</span>
        <p className="ml-2 text-gray-500">릴리즈 {updatedDate}</p>

        <span className="ml-4 font-bold">·</span>
        <p className="ml-2 text-gray-500">버전 {wepp?.version}</p>
      </div>
    </Section>
  );
};

export default WeppDetailAdditionalInfo;
