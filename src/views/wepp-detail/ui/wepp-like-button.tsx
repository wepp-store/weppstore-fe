import React from 'react';
import { useAddWeppLike, useDeleteWeppLike, useGetHasLiked } from '../api';
import { Heart } from 'lucide-react';

const WeppLikeButton = () => {
  const { data } = useGetHasLiked();

  const addMutation = useAddWeppLike();

  const deleteMutation = useDeleteWeppLike();

  const hasLiked = data?.hasLiked;

  if (hasLiked === undefined) {
    return null;
  }

  if (hasLiked) {
    return (
      <Heart color="#ff7a7a" fill="#ff7a7a" onClick={deleteMutation.mutate} />
    );
  }

  return <Heart color="#ff7a7a" onClick={addMutation.mutate} />;
};

export default WeppLikeButton;
