import { Section } from '@/shared/ui/section';
import { Button, Image } from '@nextui-org/react';
import { X, Plus } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { WeppField } from '../../types';
import { useUploadWeppImage } from '../../api';

const UpdateWeppScreenshotsSection = () => {
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

  const removeScreenshot = (index: number) => (e: any) => {
    e.preventDefault();

    setValue(
      'screenshots',
      screenshots.filter((_, i) => i !== index)
    );
  };

  return (
    <Section>
      <h2 className="text-xl font-semibold mb-4">스크린샷 (최대 5개)</h2>
      <div className="mb-4">
        <div className="flex gap-4">
          <label>
            <Button
              className="w-40 h-72 bg-gray-200 self-center"
              onPress={() => addInputRef?.current?.click()}
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
            <label key={index} className="relative">
              <Image
                src={screenshot.url}
                alt="screenshot"
                className="w-40 h-72"
              />
              <X
                onClick={removeScreenshot(index)}
                size={24}
                color="white"
                className="
                z-10
                absolute
                right-2
                top-2
                bg-gray-500
                rounded-full
                p-1
                cursor-pointer
              "
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

export default UpdateWeppScreenshotsSection;
