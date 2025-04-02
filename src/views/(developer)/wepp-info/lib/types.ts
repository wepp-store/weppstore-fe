import { ICategory, IWepp } from '@/shared/types';

export type WeppField = Pick<
  IWepp,
  | 'url'
  | 'name'
  | 'description'
  | 'tagLine'
  | 'logo'
  | 'status'
  | 'version'
  | 'screenshots'
  | 'isDesktop'
  | 'isMobile'
  | 'isTablet'
  | 'otherDevelopers'
> & { categories: Omit<ICategory, 'description'>[] };
