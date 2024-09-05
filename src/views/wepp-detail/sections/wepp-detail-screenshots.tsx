import { IWepp } from '@/shared/types';
import { ImageGallery } from '@/shared/ui/image-gallery';
import { Section } from '@/shared/ui/section';
import { Image, useDisclosure } from '@nextui-org/react';
import React from 'react';

interface Props {
  wepp: IWepp | undefined;
}

const WeppDetailScreenshots = ({ wepp }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const screenshots = wepp?.screenshots || [];

  // TODO: device 기준 사진 다르게도 설정

  return (
    <>
      <Section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">스크린샷</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {screenshots.map((screenshot) => (
            <Image
              onClick={onOpen}
              key={screenshot.id}
              src={screenshot.url}
              alt={`screenshot ${screenshot.order}`}
              radius="lg"
              className="
                flex-shrink-0
                bg-gray-200
                h-80
                min-h-80
                max-h-80
                w-auto
                max-w-none
              "
            />
          ))}
        </div>
      </Section>

      {/* screenshots gallery */}
      <ImageGallery
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        images={screenshots.map((screenshot) => screenshot.url)}
      />
    </>
  );
};

export default WeppDetailScreenshots;
