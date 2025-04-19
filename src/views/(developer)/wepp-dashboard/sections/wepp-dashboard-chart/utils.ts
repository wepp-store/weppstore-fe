/**
 *  platform별
 * @platform_ios_view
 * @platform_ios_install
 * @platform_other_view
 * @platform_other_install
 *  device type별
 * @device_desktop_view
 * @device_desktop_install
 * @device_mobile_view
 * @device_mobile_install
 * @device_tablet_view
 * @device_tablet_install
 * @device_other_view
 * @device_other_install
 */

import { format } from 'date-fns';
import { FilterType, SubFilterType } from './types';

const DEFAULT_ROW = {
  view: 0,
  install: 0,
  platform_ios_view: 0,
  platform_ios_install: 0,
  platform_other_view: 0,
  platform_other_install: 0,
  device_mobile_view: 0,
  device_mobile_install: 0,
  device_tablet_view: 0,
  device_tablet_install: 0,
  device_desktop_view: 0,
  device_desktop_install: 0,
  device_other_view: 0,
  device_other_install: 0,
};

export const SUB_FILTERS = [
  { key: 'device', label: '기기별' },
  { key: 'platform', label: '플랫폼별' },
];

export const LINE_COLORS: Record<string, string> = {
  // all
  view: '#8884d8',
  install: '#82ca9d',
  // platform
  platform_ios_view: '#8884d8',
  platform_ios_install: '#8884d8',
  platform_other_view: '#9c27b0',
  platform_other_install: '#9c27b0',
  // device
  device_mobile_view: '#00bcd4',
  device_mobile_install: '#00bcd4',
  device_tablet_view: '#4caf50',
  device_tablet_install: '#4caf50',
  device_desktop_view: '#ff9800',
  device_desktop_install: '#ff9800',
  device_other_view: '#9e9e9e',
  device_other_install: '#9e9e9e',
};

export const LABEL_MAP: Record<string, string> = {
  // all
  view: '조회수',
  install: '설치수',
  // platform
  platform_ios_view: 'iOS',
  platform_ios_install: 'iOS',
  platform_other_view: '기타',
  platform_other_install: '기타',
  // device
  device_mobile_view: '모바일',
  device_mobile_install: '모바일',
  device_tablet_view: '태블릿',
  device_tablet_install: '태블릿',
  device_desktop_view: '데스크탑',
  device_desktop_install: '데스크탑',
  device_other_view: '기타',
  device_other_install: '기타',
};

export const getKeysByFilter = (
  filter: FilterType,
  subFilter: SubFilterType
) => {
  const platformBase = ['ios', 'other'];
  const deviceBase = ['desktop', 'tablet', 'mobile', 'other'];

  if (filter === 'all') return ['view', 'install'];

  if (subFilter === 'platform')
    return platformBase.map((b) => `platform_${b}_${filter}`);
  if (subFilter === 'device')
    return deviceBase.map((b) => `device_${b}_${filter}`);

  return ['view', 'install']; // ALL
};

export const enrichChartData = (raw: any[]): any[] => {
  return raw.map((entry) => {
    // platform별만 합산해도 총 값이 나옴.
    const view = ['platform_ios_view', 'platform_other_view'].reduce(
      (acc, key) => acc + (entry[key] ?? 0),
      0
    );

    const install = ['platform_ios_install', 'platform_other_install'].reduce(
      (acc, key) => acc + (entry[key] ?? 0),
      0
    );

    return {
      ...entry,
      view,
      install,
    };
  });
};

export const fillMissingDates = (data: any[]) => {
  const filledData: any[] = [];
  const sortedDates = data
    .map((entry) => entry.date)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const startDate = new Date(sortedDates.at(0));
  const endDate = new Date(sortedDates.at(-1));
  if (!startDate || !endDate) return data;

  const dateSet = new Set(sortedDates);

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dateString = format(currentDate, 'yyyy-MM-dd');
    if (!dateSet.has(dateString)) {
      filledData.push({ date: dateString, ...DEFAULT_ROW });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return [...data, ...filledData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};
