import { ICategory } from '@/_types';

export const formatCategories = (categories: ICategory[] | undefined) => {
  if (!categories?.length) return '';

  return categories.map((c) => c.name).join(', ');
};
