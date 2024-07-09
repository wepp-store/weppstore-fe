import { useCategories } from '@/shared/apis/queries/categories/categories';
import { IWepp, ICategory } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { WeppField } from '../../types';

const UpdateWeppCategoriesSection = () => {
  const { watch, setValue } = useFormContext<WeppField>();

  const { data } = useCategories();

  const currentCategories = watch('categories');

  const onChange =
    (category: Omit<ICategory, 'description'>) => (isSelected: boolean) => {
      if (isSelected) {
        setValue('categories', [...currentCategories, category]);
      } else {
        setValue(
          'categories',
          currentCategories.filter((c) => c.id !== category.id)
        );
      }
    };

  return (
    <Section>
      <h2 className="text-xl font-semibold mb-4">카테고리</h2>

      <div className="flex gap-4">
        {data?.map((category) => (
          <Checkbox
            key={category.id}
            isSelected={currentCategories.some((c) => c.id === category.id)}
            onValueChange={onChange(category)}
          >
            {category.name}
          </Checkbox>
        ))}
      </div>
    </Section>
  );
};

export default UpdateWeppCategoriesSection;
