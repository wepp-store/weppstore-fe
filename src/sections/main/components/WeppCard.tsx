import { IWepp } from '@/_types';
import { formatCategories } from '@/_utils';
import { Button, Card, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const WeppCard = ({ wepp }: { wepp: IWepp }) => {
  const { name, description, screenshots, logo, categories } = wepp;

  const existCategories = categories && categories.length > 0;

  return (
    <Link href={`/wepp/${wepp.id}`}>
      <Card>
        <CardBody className="flex-row gap-4">
          <Image
            src={logo || ''}
            alt="wepp icon"
            width={200}
            height={200}
            radius="sm"
            className="aspect-square"
            fallbackSrc="https://via.placeholder.com/200x200"
          />
          <div className="flex flex-col justify-between w-full">
            <h3 className="font-semibold text-base mb-1">{name}</h3>
            <p className="text-gray-500 text-sm mb-2">
              {existCategories && `${formatCategories(categories)} · `}4.5 ★
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default WeppCard;
