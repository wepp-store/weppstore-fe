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
  const uploadImageMutation = useUploadWeppImage({ type: 'screenshots' });

  const { watch, setValue } = useFormContext<WeppField>();

  const screenshots = watch('screenshots');

  const { order, url } = screenshot;

  const updateScreenshot =
    (order: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      uploadImageMutation.mutate(files[0], {
        onSuccess: (data) => {
          setValue(`screenshots.${order}`, {
            order,
            style: '',
            url: data.url,
          });

          e.target.value = '';
        },
      });
    };

  const removeScreenshot = (order: number) => (e: any) => {
    e.preventDefault();

    setValue(
      'screenshots',
      screenshots
        .filter((s) => s.order !== order)
        .map((s, i) => ({ ...s, order: i }))
    );
  };

  return (
    <label className="relative" ref={ref} {...other}>
      <Image
        src={url}
        alt="screenshot"
        height={288}
        className="
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
        onChange={updateScreenshot(order)}
      />
    </label>
  );
});

export default UpdateWeppScreenshot;
