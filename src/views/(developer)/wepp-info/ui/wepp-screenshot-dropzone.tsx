import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useFormContext } from 'react-hook-form';
import { useUploadWeppImages } from '../api';
import { WeppField } from '../lib';

const WeppScreenshotDropzone = ({ children }: React.PropsWithChildren) => {
  const { setValue, watch } = useFormContext<WeppField>();

  const uploadImagesMutation = useUploadWeppImages({ type: 'screenshots' });

  const screenshots = watch('screenshots');

  const addScreenshots = (files: FileList) => {
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
      },
    });
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    addScreenshots(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default WeppScreenshotDropzone;
