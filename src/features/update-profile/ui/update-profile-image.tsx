import React from 'react';
import { Image, Tooltip } from '@nextui-org/react';
import { useUploadProfileImage } from '../api/upload-profile-image';

const UpdateProfileImage = ({ src }: { src: string | null | undefined }) => {
  const { mutate, isPending } = useUploadProfileImage();

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    mutate(files[0]);
  };

  return (
    <Tooltip showArrow content="프로필 이미지 수정">
      <label>
        <Image
          width={128}
          height={128}
          src={src || '/no-image.svg'}
          alt="Profile"
          fallbackSrc="/no-image.svg"
          className="
          w-32
          min-w-32
          h-32
          rounded-full
          border-4
          border-white
          z-50
          cursor-pointer
          "
        />
        <input type="file" onChange={onUpload} className="hidden" />
      </label>
    </Tooltip>
  );
};

export default UpdateProfileImage;
