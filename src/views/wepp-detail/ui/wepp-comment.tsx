import { IComment } from '@/shared/types';
import { StarRating } from '@/shared/ui/star-rating';
import { Button, User } from '@nextui-org/react';
import React from 'react';

interface Props {
  comment: Pick<IComment, 'content' | 'rating' | 'user'>;
}

const WeppComment = ({ comment }: Props) => {
  const { content, user } = comment;

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center mb-2 gap-4">
        <User
          name={user.userName}
          description={user.email}
          avatarProps={{
            src: user.profileUrl || '/no-image.svg',
          }}
        />
        <Button size="sm" variant="light">
          삭제
        </Button>
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default WeppComment;
