'use client';

import { useCategories } from '@/_apis/queries/categories/categories';
import { Section } from '@/components/section';
import React from 'react';

const CategoryButton = ({
  name,
  onClick,
}: {
  name: string;
  onClick: VoidFunction;
}) => (
  <button
    onClick={onClick}
    className="
      bg-gray-100
      text-gray-800
      text-sm
      font-medium
      py-2
      px-4
      rounded-full
      hover:bg-gray-200
      "
  >
    {name}
  </button>
);

const MainCategoriesSection = () => {
  const { data } = useCategories();

  return (
    <Section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">카테고리</h2>
      <div className="flex flex-wrap gap-2">
        {data?.map((category) => (
          <CategoryButton
            key={category.id}
            name={category.name}
            onClick={() => {
              console.log('clicked', category.id, category.name);
            }}
          />
        ))}
      </div>
    </Section>
  );
};

export default MainCategoriesSection;
