import { IWepp } from '@/shared/types';
import { formatCategories, installLink } from '@/shared/utils';
import { Section } from '@/shared/ui/section';
import { StarRating } from '@/shared/ui/star-rating';
import { Button, Chip, Divider, Image, Link, Tooltip } from '@nextui-org/react';
import React from 'react';
import { Heart, MessageCircle, ShieldCheck, ShieldOff } from 'lucide-react';
import { DesktopChip, MobileChip, TabletChip } from '../ui';
import WeppInstallButton from '../ui/wepp-install-button';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailTitle = ({ wepp }: Props) => {
  const {
    logo,
    name,
    isVerified,
    developer,
    categories,
    // devices
    isDesktop,
    isMobile,
    isTablet,
    _count,
  } = wepp || {};

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
        <div>
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
          <p className="text-gray-600 mb-2">{developer?.userName}</p>
          <p className="text-sm text-gray-500">
            {formatCategories(categories)}
          </p>
          <div className="flex gap-2">
            <span
              className="flex items-center gap-1 text-gray-500"
              aria-label="좋아요 수"
            >
              <Heart size={16} />
              {_count?.likes || 0}
            </span>
            <span
              className="flex items-center gap-1 text-gray-500"
              aria-label="댓글 수"
            >
              <MessageCircle size={16} />
              {_count?.comments || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {isDesktop && <DesktopChip />}
          {isMobile && <MobileChip />}
          {isTablet && <TabletChip />}
        </div>

        <WeppInstallButton wepp={wepp} />
      </div>

      <Divider />

      <h3 className="text-lg font-semibold mb-2">앱 설명</h3>
      <p className="text-gray-700 mb-4">{wepp?.description}</p>
    </Section>
  );
};

export default WeppDetailTitle;
