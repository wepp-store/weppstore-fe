import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { Image, Tooltip } from '@nextui-org/react';
import React from 'react';
import { Heart, MessageCircle, ShieldCheck, ShieldOff } from 'lucide-react';
import { WeppLikeButton } from '../ui';
import WeppInstallButton from '../ui/wepp-install-button';
import { ELEMENT_ID } from '@/shared/constants';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailTitle = ({ wepp }: Props) => {
  const { logo, name, isVerified, tagLine, categories, _count } = wepp || {};

  const onCommentIconClick = () => {
    const inputElement = document.getElementById(
      ELEMENT_ID.CREATE_COMMENT_FIELD
    );
    inputElement?.scrollIntoView({
      behavior: 'smooth',
    });
    inputElement?.focus();
  };

  return (
    <Section className="flex flex-col gap-4">
      <div className="flex items-center mb-3 gap-8">
        <Image
          src={logo || undefined}
          width={96}
          height={96}
          className="aspect-square"
          alt="wepp icon"
          radius="sm"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold mb-1 flex gap-4 items-center">
            {name}
            {isVerified ? (
              <Tooltip content="설치 팝업이 제공된 앱입니다.">
                <ShieldCheck
                  className="text-green-500"
                  size={20}
                  aria-label="인증됨"
                />
              </Tooltip>
            ) : (
              <Tooltip content="설치 팝업이 제공되지 않은 앱입니다.">
                <ShieldOff
                  className="text-gray-500"
                  size={20}
                  aria-label="인증되지 않음"
                />
              </Tooltip>
            )}
          </h2>

          <p className="text-gray-500">{tagLine}</p>
        </div>
      </div>

      <div className="flex justify-between items-center min-w-48">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="">
            {(categories ?? [])
              .slice(0, 2)
              .map((c) => c.name)
              .join(', ')}
          </span>

          {(categories ?? []).length > 2 && (
            <span className="text-gray-500">
              외 {(categories ?? []).length - 2}개
            </span>
          )}

          <span className="font-bold">·</span>

          <div className="flex gap-3 text-gray-600">
            <span
              className="flex items-center gap-1 text-gray-500"
              aria-label="좋아요 수"
            >
              <WeppLikeButton />
              {_count?.likes || 0}
            </span>
            <span
              className="flex items-center gap-1 text-gray-500"
              aria-label="댓글 수"
            >
              <MessageCircle
                size={20}
                onClick={onCommentIconClick}
                role="button"
                aria-label="댓글 달기"
              />
              {_count?.comments || 0}
            </span>
          </div>
        </div>

        <WeppInstallButton wepp={wepp} className="ml-auto rounded-md" />
      </div>
    </Section>
  );
};

export default WeppDetailTitle;
