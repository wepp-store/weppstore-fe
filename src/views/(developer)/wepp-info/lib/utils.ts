import { IWepp } from '@/shared/types';
import { WeppField } from './types';
import * as y from 'yup';

const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

export const convertUpdateWeppForm = (wepp: IWepp): WeppField => {
  return {
    url: wepp.url,
    name: wepp.name,
    logo: wepp.logo,
    status: wepp.status,
    version: wepp.version,
    tagLine: wepp.tagLine,
    isMobile: wepp.isMobile,
    isTablet: wepp.isTablet,
    isDesktop: wepp.isDesktop,
    categories: wepp.categories,
    screenshots: wepp.screenshots,
    description: wepp.description,
  };
};

export const weppSchema = y
  .object()
  .shape({
    logo: y.string().required('로고를 등록해주세요.'),
    url: y
      .string()
      .required('앱 URL을 입력해주세요.')
      .test('is-url-valid', 'URL 형식이 아닙니다.', (value: string) => {
        return isValidUrl(value);
      }),
    name: y.string().required('앱 이름을 입력해주세요.'),
    categories: y.array().min(1, '카테고리를 선택해주세요.'),
    description: y.string().required('앱 설명을 입력해주세요.'),
    // devices
    isMobile: y.boolean(),
    isTablet: y.boolean(),
    isDesktop: y.boolean(),
  })
  .test('oneOfThree', function (value) {
    const { isMobile, isTablet, isDesktop } = value;
    if (!isMobile && !isTablet && !isDesktop) {
      return this.createError({
        path: 'devices',
        message: '호환되는 기기 중 하나는 필수입니다.',
      });
    }
    return true;
  });
