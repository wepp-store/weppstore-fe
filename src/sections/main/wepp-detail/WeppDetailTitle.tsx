import { IWepp } from '@/_types';
import { formatCategories } from '@/_utils';
import { Section } from '@/components/section';
import { StarRating } from '@/components/star-rating';
import { Button, Image } from '@nextui-org/react';
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

      <div className="flex justify-between items-center mb-6">
        <StarRating rating={4} />
        <Button color="primary">받기</Button>
      </div>
    </Section>
  );
};

export default WeppDetailTitle;
