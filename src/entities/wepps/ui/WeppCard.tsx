import { IWepp } from '@/shared/types';
import { formatCategories } from '@/shared/utils';
import { Card, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';

interface Props {
  wepp: IWepp;
  href: string;
}

const WeppCard = ({ wepp, href }: Props) => {
  const { name, description, screenshots, logo, categories } = wepp;

  const existCategories = categories && categories.length > 0;

  return (
    <Card as={Link} href={href} isPressable>
      <CardBody className="flex-row gap-4">
        <Image
          src={logo || ''}
          alt={`${name} logo`}
          width={56}
          height={56}
          radius="sm"
          className="aspect-square w-[56px] min-w-[56px] h-[56px] object-cover"
          fallbackSrc="/no-image.svg"
        />
        <div className="flex flex-col justify-between w-full">
          <h3 className="font-semibold text-base mb-1">{name}</h3>
          <p className="text-gray-500 text-sm mb-2">
            {existCategories && `${formatCategories(categories)} · `}4.5 ★
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default WeppCard;
