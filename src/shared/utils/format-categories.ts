import { ICategory } from '@/shared/types';

export const formatCategories = (categories: ICategory[] | undefined) => {
  if (!categories?.length) return '';

  return categories.map((c) => c.name).join(', ');
};
