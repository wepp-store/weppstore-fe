import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useUploadWeppImages } from '../api';
import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import type { WeppField } from '../lib';

const AddWeppScreenshot = () => {
  const addInputRef = React.useRef<HTMLInputElement | null>(null);

  const { setValue, watch } = useFormContext<WeppField>();

  const uploadImagesMutation = useUploadWeppImages({ type: 'screenshots' });

  const screenshots = watch('screenshots');

  const addScreenshots = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentCount = screenshots.length;
    const addedCount = files.length;

    if (currentCount + addedCount > 5) {
      toast.error('스크린샷은 최대 5개까지만 추가할 수 있습니다.');
      return;
    }

    const lastIndex = currentCount;

    uploadImagesMutation.mutate(files, {
      onSuccess: (data: { url: string }[]) => {
        setValue(`screenshots`, [
          ...screenshots,
          ...data.map((d, i) => ({
            order: lastIndex + i,
            style: '',
            url: d.url,
          })),
        ]);

        e.target.value = '';
      },
    });
  };

  return (
    <label>
      <Button
        className="w-40 h-72 bg-gray-100 dark:bg-gray-700 self-center"
        onPress={() => addInputRef?.current?.click()}
      >
        <Plus />
      </Button>
      <input
        ref={addInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={addScreenshots}
      />
    </label>
  );
};

export default AddWeppScreenshot;
