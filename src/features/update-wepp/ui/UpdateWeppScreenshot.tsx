import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { WeppField } from '../types';
import { useUploadWeppImage } from '../api';
import { X } from 'lucide-react';
import { Image } from '@nextui-org/react';

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  screenshot: WeppField['screenshots'][0];
}

const UpdateWeppScreenshot = forwardRef(function UpdateWeppScreenshot(
  { screenshot, ...other }: Props,
  ref: any
) {
  const uploadImageMutation = useUploadWeppImage();

  const { watch, setValue } = useFormContext<WeppField>();

  const screenshots = watch('screenshots');

  const { order, url } = screenshot;

  const updateScreenshot =
    (order: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      uploadImageMutation.mutate(file, {
        onSuccess: (data) => {
          setValue(`screenshots.${order}`, {
            order,
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
    <label className="relative" ref={ref} {...other}>
      <Image
        src={url}
        alt="screenshot"
        width={160}
        height={288}
        className="
          w-40
          min-w-40
          max-w-40
          h-72
          min-h-72
          max-h-72
        "
      />
      <X
        onClick={removeScreenshot(order)}
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
        onChange={updateScreenshot(order)}
      />
    </label>
  );
});

export default UpdateWeppScreenshot;
