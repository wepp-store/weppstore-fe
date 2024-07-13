import { ICategory, IWepp } from '@/shared/types';

export type WeppField = Pick<
  IWepp,
  | 'url'
  | 'name'
  | 'description'
  | 'logo'
  | 'status'
  | 'version'
  | 'screenshots'
  | 'categories'
  | 'isDesktop'
  | 'isMobile'
  | 'isTablet'
> & { categories: Omit<ICategory, 'description'>[] };
