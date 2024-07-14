import { IWepp } from '@/shared/types';
import { Card, Link, Image, CardBody } from '@nextui-org/react';
import React from 'react';

interface Props {
  wepp: IWepp;
}

const DeveloperWeppCard = ({ wepp }: Props) => {
  const { id, logo, name, description } = wepp;

  return (
    <Card as={Link} href={`/developer/wepp/${id}`} isPressable>
      <CardBody className="flex flex-row items-center justify-between">
        <Image src={logo || ''} alt={name} width={100} height={100} />
        <div className="mr-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default DeveloperWeppCard;
