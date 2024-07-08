import { useUploadWeppImage } from '@/_apis/queries/wepp';
import { Button, Image } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { WeppField } from '../types';
import { Plus } from 'lucide-react';
import { Section } from '@/components/section';

const ScreenshotsSection = () => {
  const addInputRef = React.useRef<HTMLInputElement | null>(null);

  const { watch, setValue } = useFormContext<WeppField>();

  const screenshots = watch('screenshots');

  const uploadImageMutation = useUploadWeppImage();

  const addScreenshots = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    e.target.value = '';

    uploadImageMutation.mutate(file, {
      onSuccess: (data) => {
        setValue(`screenshots`, [
          ...screenshots,
          {
            order: 0,
            style: '',
            url: `http://localhost:8000${data.url}`,
          },
        ]);
      },
    });
  };

  const updateScreenshot =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      uploadImageMutation.mutate(file, {
        onSuccess: (data) => {
          setValue(`screenshots.${index}`, {
            order: index,
            style: '',
            url: `http://localhost:8000${data.url}`,
          });
          e.target.value = '';
        },
      });
    };

  return (
    <Section>
      <h2 className="text-xl font-semibold mb-4">스크린샷 (최대 5개)</h2>
      <div className="mb-4">
        <div className="flex gap-4">
          <label>
            <Button
              className="w-40 h-72 bg-gray-200 self-center"
              onClick={() => addInputRef?.current?.click()}
            >
              <Plus />
            </Button>
            <input
              ref={addInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={addScreenshots}
            />
          </label>
          {screenshots.map((screenshot, index) => (
            <label key={index}>
              <Image
                src={screenshot.url}
                alt="screenshot"
                className="w-40 h-72"
              />
              <input
                className="hidden"
                id="screenshots"
                type="file"
                accept="image/*"
                multiple
                onChange={updateScreenshot(index)}
              />
            </label>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ScreenshotsSection;
