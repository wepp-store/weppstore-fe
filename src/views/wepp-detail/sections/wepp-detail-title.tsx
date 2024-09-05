import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { Image, Tooltip } from '@nextui-org/react';
import React from 'react';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { WeppLikeButton } from '../ui';
import WeppInstallButton from '../ui/wepp-install-button';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailTitle = ({ wepp }: Props) => {
  const { logo, name, isVerified, tagLine } = wepp || {};

  return (
    <Section className="flex flex-col gap-4">
      <div className="flex items-center mb-6 gap-8">
        <Image
          src={logo || undefined}
          width={96}
          height={96}
          className="aspect-square"
          alt="wepp icon"
          radius="sm"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold mb-1 flex gap-4 items-center">
            {name}
            {isVerified ? (
              <Tooltip content="설치 팝업이 제공된 앱입니다.">
                <ShieldCheck
                  className="text-green-500"
                  size={20}
                  aria-label="인증됨"
                />
              </Tooltip>
            ) : (
              <Tooltip content="설치 팝업이 제공되지 않은 앱입니다.">
                <ShieldOff
                  className="text-gray-500"
                  size={20}
                  aria-label="인증되지 않음"
                />
              </Tooltip>
            )}
          </h2>

          <p className="text-gray-600">{tagLine}</p>

          <div className="flex justify-between items-center min-w-48">
            <WeppLikeButton />
            <WeppInstallButton wepp={wepp} className="hidden md:flex" />
          </div>
        </div>
      </div>
      <WeppInstallButton wepp={wepp} className="md:hidden" />
    </Section>
  );
};

export default WeppDetailTitle;
