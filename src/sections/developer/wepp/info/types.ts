import { ICategory, IWepp } from '@/_types';

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
