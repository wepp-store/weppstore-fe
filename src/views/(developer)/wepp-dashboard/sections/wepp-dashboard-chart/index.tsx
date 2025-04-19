'use client';

import React from 'react';
import { useEventLogs } from '@/shared/apis/queries/wepp/event-logs';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { useParams } from 'next/navigation';
import { Section } from '@/shared/ui/section';
import { Select, SelectItem, Tab, Tabs } from '@nextui-org/react';
import {
  enrichChartData,
  getKeysByFilter,
  LABEL_MAP,
  LINE_COLORS,
  SUB_FILTERS,
} from './utils';
import { FilterType, SubFilterType } from './types';

// ----------------------------------------------------------------------

const CustomLegend = ({ payload }: any) => (
  <div className="flex gap-4 text-sm mt-2 flex-wrap justify-center">
    {payload.map((entry: any) => (
      <div key={entry.dataKey} className="flex items-center gap-1">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        {LABEL_MAP[entry.dataKey] ?? entry.dataKey}
      </div>
    ))}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white p-2 rounded shadow text-sm border border-gray-300">
      <p className="font-semibold">{label}</p>
      <ul className="space-y-1 mt-1">
        {payload.map((entry: any) => (
          <li key={entry.dataKey} style={{ color: entry.color }}>
            {LABEL_MAP[entry.dataKey] ?? entry.dataKey}: {entry.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ----------------------------------------------------------------------

const WeppDashboardChart = () => {
  const { weppId }: { weppId: string } = useParams();
  const { data: eventLogs } = useEventLogs({ weppId });

  const [filter, setFilter] = React.useState<FilterType>('all');
  const [subFilter, setSubFilter] = React.useState<SubFilterType>('device');

  const chartData = React.useMemo(() => {
    if (!eventLogs) return [];
    return enrichChartData(eventLogs);
  }, [eventLogs]);

  const keysByFilter = React.useMemo(
    () => getKeysByFilter(filter, subFilter),
    [filter, subFilter]
  );

  return (
    <Section className="mt-8">
      <div className="flex justify-between mb-4 items-center">
        <Tabs
          size="sm"
          radius="sm"
          aria-label="필터"
          selectedKey={filter}
          onSelectionChange={(key) => setFilter(key as FilterType)}
        >
          <Tab key="all" title="전체" />
          <Tab key="view" title="조회수" />
          <Tab key="install" title="설치수" />
        </Tabs>

        {filter !== 'all' && (
          <Select
            aria-label="필터 선택"
            className="w-28"
            placeholder="필터 선택"
            size="sm"
            selectedKeys={[subFilter]}
            onChange={(e) => {
              setSubFilter(e.target.value as 'platform' | 'device');
            }}
          >
            {SUB_FILTERS.map((subFilter) => (
              <SelectItem key={subFilter.key} textValue={subFilter.label}>
                {subFilter.label}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            {keysByFilter.map((key) => (
              <linearGradient
                id={`fill_${key}`}
                key={key}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={LINE_COLORS[key]}
                  stopOpacity={0.7}
                />
                <stop
                  offset="95%"
                  stopColor={LINE_COLORS[key]}
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>

          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {keysByFilter.map((key) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={LINE_COLORS[key]}
              fill={`url(#fill_${key})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Section>
  );
};

export default WeppDashboardChart;
