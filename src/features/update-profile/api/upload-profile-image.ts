//

import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { authKeys } from '@/shared/apis/queries/auth/query-key-factory';
import { IUser } from '@/shared/types';
import { resizeImage } from '@/shared/utils/resize-image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const upload = async (file: File) => {
  const formData = new FormData();
  const resizedFile = await resizeImage(file);
  formData.append('file', resizedFile);

  const response = await axiosInstance.post<{ url: string }>(
    PATH_API.AUTH.UPLOAD_PROFILE,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data.url;
};

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upload,
    onSuccess: (profileUrl: string) => {
      toast.success('프로필 이미지가 수정되었습니다.');
      const oldData = queryClient.getQueryData<IUser>(authKeys.profile);
      queryClient.setQueryData(authKeys.profile, {
        ...oldData,
        profileUrl,
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
