import { IWepp } from '@/shared/types';
import { formatCategories } from '@/shared/utils';
import { Section } from '@/shared/ui/section';
import { StarRating } from '@/shared/ui/star-rating';
import { Button, Chip, Divider, Image } from '@nextui-org/react';
import React from 'react';
import { DesktopChip, MobileChip, TabletChip } from '@/entities/wepps';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailTitle = ({ wepp }: Props) => {
  const {
    logo,
    name,
    developer,
    categories,
    // devices
    isDesktop,
    isMobile,
    isTablet,
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
          <h2 className="text-2xl font-bold mb-1">{name}</h2>
          <p className="text-gray-600 mb-2">{developer?.userName}</p>
          <p className="text-sm text-gray-500">
            {formatCategories(categories)}
          </p>
          <StarRating rating={4} />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {isDesktop && <DesktopChip />}
          {isMobile && <MobileChip />}
          {isTablet && <TabletChip />}
        </div>
        <Button color="primary">받기</Button>
      </div>

      <Divider />

      <h3 className="text-lg font-semibold mb-2">앱 설명</h3>
      <p className="text-gray-700 mb-4">{wepp?.description}</p>
    </Section>
  );
};

export default WeppDetailTitle;
