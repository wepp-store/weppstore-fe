import { IWepp } from '@/_types';
import { Card } from '@/components/card';
import Image from 'next/image';
import React from 'react';

const WeppCard = ({ wepp }: { wepp: IWepp }) => {
  const { name, description, images } = wepp;

  const logo = images.find((image) => image.type === 'LOGO');

  return (
    <Card>
      {logo?.url && (
        <Image
          src={logo?.url}
          alt="wepp store logo"
          width={48}
          height={48}
          onError={(e) => {
            e.currentTarget.src = '/logo.svg';
          }}
        />
      )}
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-700">{description}</p>
    </Card>
  );
};

export default WeppCard;
