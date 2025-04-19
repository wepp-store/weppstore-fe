import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { formatCategories } from '@/shared/utils';
import { Heart, MessageCircle } from 'lucide-react';
import React from 'react';
import { DesktopChip, MobileChip, TabletChip } from '../ui';
import { Divider } from '@nextui-org/react';

const SubInfo = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="
        py-2
        px-6
        flex
        flex-col
        items-center
        gap-1
        "
    >
      <span className="text-gray-500 text-xs text-nowrap">{title}</span>
      {children}
    </div>
  );
};

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailSubInfo = ({ wepp }: Props) => {
  const {
    developer,
    categories,
    // devices
    isDesktop,
    isMobile,
    isTablet,
    _count,
  } = wepp || {};

  return (
    <Section>
      <Divider />
      <div className="flex p-2 items-center overflow-x-auto">
        {/* 좋아요 수 */}
        <SubInfo title="좋아요 수">
          <span className="flex items-center gap-1 text-gray-500 text-nowrap">
            {_count?.likes || 0}
          </span>
        </SubInfo>
        <Divider orientation="vertical" className="h-6" />

        {/* 댓글 수 */}
        <SubInfo title="댓글 수">
          <span className="flex items-center gap-1 text-gray-500 text-nowrap">
            {_count?.comments || 0}
          </span>
        </SubInfo>
        <Divider orientation="vertical" className="h-6" />

        {/* 카테고리 */}
        <SubInfo title="카테고리">
          <span className="flex items-center gap-1 text-gray-500 text-nowrap">
            {formatCategories(categories)}
          </span>
        </SubInfo>
        <Divider orientation="vertical" className="h-6" />

        {/* 개발자 */}
        <SubInfo title="개발자">
          <span className="flex items-center gap-1 text-gray-500 text-nowrap">
            {developer?.userName}
          </span>
        </SubInfo>
        <Divider orientation="vertical" className="h-6" />

        {/* 호환성 */}
        <SubInfo title="호환성">
          <div className="flex gap-4">
            {isDesktop && <DesktopChip />}
            {isMobile && <MobileChip />}
            {isTablet && <TabletChip />}
          </div>
        </SubInfo>
      </div>
    </Section>
  );
};

export default WeppDetailSubInfo;
