import React from 'react';
import { useAddWeppLike, useDeleteWeppLike, useGetHasLiked } from '../api';
import { Heart } from 'lucide-react';
import { debounce } from '@/shared/utils';
import toast from 'react-hot-toast';

const WeppLikeButton = () => {
  const { data } = useGetHasLiked();

  const addMutation = useAddWeppLike();

  const deleteMutation = useDeleteWeppLike();

  const hasLiked = data?.hasLiked;

  const handleAddLike = debounce(addMutation.mutate, 250);

  const handleDeleteLike = debounce(deleteMutation.mutate, 250);

  const onLikeWhenNotLogin = () => {
    toast.error('좋아요는 로그인 후 이용할 수 있습니다.');
  };

  if (hasLiked === undefined) {
    return (
      <Heart
        size={20}
        role="button"
        aria-label="좋아요"
        onClick={onLikeWhenNotLogin}
      />
    );
  }

  if (hasLiked) {
    return (
      <Heart
        size={20}
        color="#ff7a7a"
        role="button"
        fill="#ff7a7a"
        onClick={handleDeleteLike}
        aria-label="좋아요 취소"
      />
    );
  }

  return (
    <Heart
      size={20}
      color="#ff7a7a"
      role="button"
      onClick={handleAddLike}
      aria-label="좋아요 누르기"
    />
  );
};

export default WeppLikeButton;
