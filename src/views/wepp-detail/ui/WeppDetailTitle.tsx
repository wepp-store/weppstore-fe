import { IWepp } from '@/shared/types';
import { formatCategories } from '@/shared/utils';
import { Section } from '@/shared/ui/section';
import { StarRating } from '@/shared/ui/star-rating';
import { Button, Divider, Image } from '@nextui-org/react';
import React from 'react';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailTitle = ({ wepp }: Props) => {
  const { logo, name, developer, categories } = wepp || {};

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
        </div>
      </div>

      <div className="flex justify-between items-center">
        <StarRating rating={4} />
        <Button color="primary">받기</Button>
      </div>

      <Divider />

      <h3 className="text-lg font-semibold mb-2">앱 설명</h3>
      <p className="text-gray-700 mb-4">{wepp?.description}</p>
    </Section>
  );
};

export default WeppDetailTitle;
