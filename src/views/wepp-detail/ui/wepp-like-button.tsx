import React from 'react';
import { useAddWeppLike, useDeleteWeppLike, useGetHasLiked } from '../api';
import { Heart } from 'lucide-react';
import { debounce } from '@/shared/utils';

const WeppLikeButton = () => {
  const { data } = useGetHasLiked();

  const addMutation = useAddWeppLike();

  const deleteMutation = useDeleteWeppLike();

  const hasLiked = data?.hasLiked;

  const handleAddLike = debounce(addMutation.mutate, 250);

  const handleDeleteLike = debounce(deleteMutation.mutate, 250);

  if (hasLiked === undefined) {
    return null;
  }

  if (hasLiked) {
    return (
      <Heart
        color="#ff7a7a"
        role="button"
        fill="#ff7a7a"
        onClick={handleDeleteLike}
      />
    );
  }

  return <Heart color="#ff7a7a" role="button" onClick={handleAddLike} />;
};

export default WeppLikeButton;
