import { ICategory, IWepp } from '@/shared/types';

export type WeppField = Omit<
  IWepp,
  | 'id'
  | 'developerId'
  | 'developer'
  | 'createdAt'
  | 'updatedAt'
  | 'categories'
  | 'views'
> & { categories: Omit<ICategory, 'description'>[] };
