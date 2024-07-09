import { useCategories } from '@/shared/apis/queries/categories/categories';
import { IWepp, ICategory } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { WeppField } from '../types';

const CategoriesSection = () => {
  const { watch, setValue } = useFormContext<WeppField>();

  const { data } = useCategories();

  const onChange =
    (category: Omit<ICategory, 'description'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;

      const currentCategories = watch('categories');

      if (isChecked) {
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

      <CheckboxGroup orientation="horizontal" color="primary">
        {data?.map((category) => (
          <Checkbox
            key={category.id}
            value={String(category.id)}
            onChange={onChange(category)}
          >
            {category.name}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Section>
  );
};

export default CategoriesSection;
