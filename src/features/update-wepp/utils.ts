import { IWepp } from '@/shared/types';
import { WeppField } from './types';

export const convertUpdateWeppForm = (wepp: IWepp): WeppField => {
  return {
    url: wepp.url,
    name: wepp.name,
    logo: wepp.logo,
    status: wepp.status,
    version: wepp.version,
    isMobile: wepp.isMobile,
    isTablet: wepp.isTablet,
    isDesktop: wepp.isDesktop,
    categories: wepp.categories,
    screenshots: wepp.screenshots,
    description: wepp.description,
  };
};
