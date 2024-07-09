import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useUploadWeppImage } from '../api';
import { WeppField } from '../types';
import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';

const AddWeppScreenshot = () => {
  const addInputRef = React.useRef<HTMLInputElement | null>(null);

  const { setValue, watch } = useFormContext<WeppField>();

  const uploadImageMutation = useUploadWeppImage();

  const screenshots = watch('screenshots');

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

  return (
    <label>
      <Button
        className="w-40 h-72 bg-gray-100 self-center"
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
  );
};

export default AddWeppScreenshot;
