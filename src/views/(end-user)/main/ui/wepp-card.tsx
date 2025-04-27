import { IWepp } from '@/shared/types';
import { formatCategories } from '@/shared/utils';
import { Card, CardBody, Image } from '@nextui-org/react';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface Props {
  wepp: IWepp;
  href: string;
}

const WeppCard = ({ wepp, href }: Props) => {
  const { name, logo, categories, _count } = wepp;

  const existCategories = categories && categories.length > 0;

  return (
    <Card
      as={Link}
      href={href}
      isPressable
      className="border-none shadow-none bg-gray-100 dark:bg-gray-800 hover:-translate-y-1 transition-all duration-200 ease-in-out"
    >
      <CardBody className="flex-row gap-4">
        <Image
          src={logo || ''}
          alt={`${name} logo`}
          width={72}
          height={72}
          radius="sm"
          className="aspect-square w-[72px] min-w-[72px] h-[72px] object-cover"
          fallbackSrc="/no-image.svg"
        />
        <div className="w-full flex flex-col justify-between gap-1">
          <h3 className="font-semibold text-base">{name}</h3>
          <p className="text-gray-500 text-sm">
            {existCategories && formatCategories(categories)}
          </p>
          <div className="flex gap-2 text-gray-500 text-sm">
            <span
              className="flex items-center gap-1 text-gray-500"
              aria-label="좋아요 수"
            >
              <Heart size={12} />
              {_count?.likes || 0}
            </span>
            <span
              className="flex items-center gap-1 text-gray-500"
              aria-label="댓글 수"
            >
              <MessageCircle size={12} />
              {_count?.comments || 0}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WeppCard;
