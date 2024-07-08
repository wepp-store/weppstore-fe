import { ICategory, IWepp } from '@/_types';

export type WeppField = Omit<
  IWepp,
  'id' | 'developerId' | 'developer' | 'createdAt' | 'updatedAt' | 'categories'
> & { categories: Omit<ICategory, 'description'>[] };
