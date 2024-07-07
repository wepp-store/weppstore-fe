import { IWepp } from '@/_types';
import { Card } from '@/components/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const WeppCard = ({ wepp }: { wepp: IWepp }) => {
  const { name, description, screenshots, logo } = wepp;

  return (
    <Link href={`/wepp/${wepp.id}`}>
      <Card
        className="
        bg-white
        rounded-lg
        p-4
        flex
        flex-col
        hover:shadow-lg
      "
      >
        <Image
          src={logo || ''}
          alt="wepp icon"
          width={48}
          height={48}
          onError={(e) => {
            e.currentTarget.src = '/logo.svg';
          }}
          className="w-16 h-16 bg-gray-200 rounded-lg mb-2 self-center"
        />
        <h3 className="font-semibold text-sm mb-1">{name}</h3>
        <p className="text-xs text-gray-500 mb-2">액션 · 4.5 ★</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs font-semibold text-gray-500">카테고리</span>
          <button
            className="
            bg-blue-500
            text-white
            text-xs
            font-semibold
            py-1
            px-2
            rounded
          "
          >
            받기
          </button>
        </div>
      </Card>
    </Link>
  );
};

export default WeppCard;
