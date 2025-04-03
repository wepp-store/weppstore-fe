import { PATH_API } from '@/shared/apis/path';
import { API_DOMAIN } from '@/shared/constants';

const DOMAIN = 'https://weppstore.com';
const WEPP_LIST_API_PATH =
  API_DOMAIN + '/api/v1' + PATH_API.WEPP.ROOT + '?page=1&size=20';

export default async function sitemap() {
  const wepps = await fetch(WEPP_LIST_API_PATH).then((res) => res.json());

  const weppList =
    wepps?.data?.map((wepp: any) => ({
      url: `${DOMAIN}/wepps/${wepp.id}`,
      lastModified: new Date(wepp.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })) ?? [];

  return [
    {
      url: `${DOMAIN}/wepps`,
      lastModified: new Date(2025, 3, 3),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/developer/make-pwa`,
      lastModified: new Date(2025, 3, 3),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...weppList,
  ];
}
