import { Section } from '@/components/section';
import { StarRating } from '@/components/star-rating';
import React from 'react';

const Review = ({ review }: any) => (
  <div className="border-b border-gray-200 py-4">
    <div className="flex items-center mb-2">
      <StarRating rating={review.rating} />
      <span className="ml-2 text-gray-600 text-sm">{review.author}</span>
    </div>
    <p className="text-gray-700">{review.content}</p>
  </div>
);

const WeppDetailReviews = () => {
  const reviews = [
    {
      id: 1,
      author: '사용자1',
      rating: 5,
      content: '정말 재미있는 게임입니다!',
    },
    {
      id: 2,
      author: '사용자2',
      rating: 4,
      content: '그래픽이 아주 좋아요. 하지만 난이도가 좀 높습니다.',
    },
  ];

  return (
    <Section>
      <h3 className="text-lg font-semibold mb-2">리뷰</h3>

      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </Section>
  );
};

export default WeppDetailReviews;
