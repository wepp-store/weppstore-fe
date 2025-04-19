import { PATH } from '@/shared/constants';
import { IWepp } from '@/shared/types';
import { weppStatusToColor, weppStatusToText } from '@/shared/utils';
import { Card, Link, Image, CardBody, Chip } from '@nextui-org/react';
import { Eye, Heart, MessageCircle } from 'lucide-react';
import React from 'react';

interface Props {
  wepp: IWepp;
}

const DeveloperWeppCard = ({ wepp }: Props) => {
  const { id, logo, name, tagLine, _count, views, status } = wepp;

  return (
    <Card
      as={Link}
      href={PATH.DEVELOPER.WEPP_DETAIL(id)}
      isPressable
      className="border-none shadow-none bg-gray-100 hover:bg-gray-200 transition-all duration-200 ease-in-out"
    >
      <CardBody className="flex flex-row justify-between gap-8">
        <Image
          src={logo || ''}
          alt={name}
          width={72}
          height={72}
          fallbackSrc="/no-image.svg"
          className="aspect-square w-[72px] min-w-[72px] h-[72px] object-cover"
        />
        <div className="w-full h-full flex flex-col gap-2 grow justify-between">
          <div className="w-full mr-4">
            <div className="w-full flex justify-between">
              <h3 className="text-lg font-semibold">{name}</h3>
              <Chip
                color={weppStatusToColor(status)}
                variant="flat"
                className="rounded-md"
              >
                {weppStatusToText(status)}
              </Chip>
            </div>
            <p className="mt-2 text-sm text-gray-500">{tagLine}</p>
          </div>

          {/* counts */}
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
            <span
              className="flex items-center gap-1 text-gray-500"
              aria-label="댓글 수"
            >
              <Eye size={12} />
              {views || 0}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DeveloperWeppCard;
