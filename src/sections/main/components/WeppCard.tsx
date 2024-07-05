import { IWepp } from '@/_types';
import { Card } from '@/components/card';
import Image from 'next/image';
import React from 'react';

const WeppCard = ({ wepp }: { wepp: IWepp }) => {
  const { name, description, screenshots, logo } = wepp;

  return (
    <Card className="p-4">
      <Image
        src={logo}
        alt="wepp icon"
        width={48}
        height={48}
        onError={(e) => {
          e.currentTarget.src = '/logo.svg';
        }}
        className="w-20 h-20 mx-auto mb-2 rounded-xl"
      />
      <h3 className="text-center text-sm text-gray-600">{name}</h3>
      <p className="text-center text-sm text-gray-600">액션 · 4.5 ★</p>
      <p className="text-center text-sm text-gray-600">{description}</p>
      <button className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-lg">
        받기
      </button>
    </Card>
  );
};

export default WeppCard;
