'use client';

import { useCategories } from '@/shared/apis/queries/categories/categories';
import { Section } from '@/shared/ui/section';
import { Button } from '@nextui-org/react';
import React from 'react';

const CategoryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: VoidFunction;
}) => (
  <Button
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
    onPress={onClick}
  >
    {children}
  </Button>
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
            onClick={() => {
              console.log('clicked', category.id, category.name);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </div>
    </Section>
  );
};

export default MainCategoriesSection;
