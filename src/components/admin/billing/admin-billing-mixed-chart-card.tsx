import type { ReactElement } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartScrollX } from '@/components/charts/chart-scroll-x';
import type { AdminLineDatum } from '@/data/admin-chart';
import type { AdminBillingMixedSeries } from '@/data/admin-billing';
import { cn } from '@/lib/utils';
import { AdminDashboardCard } from '@/components/admin/dashboard/admin-dashboard-card';
import { AdminDashboardChartLegend } from '@/components/admin/dashboard/admin-dashboard-chart-legend';

function MixedChartTooltip({
  active,
  label,
  payload,
  series,
  labelFormatter,
  valueFormatter,
}: {
  active?: boolean;
  label?: string;
  payload?: Array<{
    value?: number;
    dataKey?: string;
  }>;
  series: AdminBillingMixedSeries[];
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number, series: AdminBillingMixedSeries) => string;
}): ReactElement | null {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 px-3 py-2 card-gradient-bg-modal shadow-[0px_10px_30px_rgba(0,0,0,0.22)]">
      {label ? (
        <p className="text-[12px] font-medium text-foreground/70 dark:text-white/55">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
      ) : null}

      <div className="mt-2 flex flex-col gap-1.5">
        {payload.map((entry) => {
          const currentSeries = series.find((item) => item.dataKey === entry.dataKey);
          if (!currentSeries || typeof entry.value !== 'number') return null;

          return (
            <div key={currentSeries.dataKey} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: currentSeries.color }}
                  aria-hidden
                />
                <span className="text-[12px] text-foreground/75 dark:text-white/60">
                  {currentSeries.label}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-foreground dark:text-white">
                {valueFormatter
                  ? valueFormatter(entry.value, currentSeries)
                  : entry.value.toLocaleString('pt-BR')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AdminBillingMixedChartCard({
  title,
  subtitle,
  data,
  series,
  className,
  chartClassName,
  labelFormatter,
  valueFormatter,
  yAxisFormatter = (value) => value.toLocaleString('pt-BR'),
  minChartWidthPx = 0,
}: {
  title: string;
  subtitle?: string;
  data: AdminLineDatum[];
  series: AdminBillingMixedSeries[];
  className?: string;
  chartClassName?: string;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number, series: AdminBillingMixedSeries) => string;
  yAxisFormatter?: (value: number) => string;
  minChartWidthPx?: number;
}) {
  const chart = (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 12, right: 8, left: 2, bottom: 2 }}
      >
        <CartesianGrid stroke="var(--grid-line)" strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          height={76}
          interval={0}
          tickMargin={12}
          tick={{ fill: 'var(--yaxis-color)', fontSize: 11 }}
          angle={-45}
          textAnchor="end"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={68}
          tick={{ fill: 'var(--yaxis-color)', fontSize: 11 }}
          tickFormatter={yAxisFormatter}
        />
        <Tooltip
          cursor={{ stroke: 'rgba(255,255,255,0.12)', strokeDasharray: '4 4' }}
          content={
            <MixedChartTooltip
              series={series}
              labelFormatter={labelFormatter}
              valueFormatter={valueFormatter}
            />
          }
        />
        {series.map((entry) =>
          entry.type === 'bar' ? (
            <Bar
              key={entry.dataKey}
              dataKey={entry.dataKey}
              fill={entry.color}
              radius={[8, 8, 0, 0]}
              maxBarSize={18}
            />
          ) : (
            <Line
              key={entry.dataKey}
              type="monotone"
              dataKey={entry.dataKey}
              stroke={entry.color}
              strokeWidth={entry.strokeWidth ?? 2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: entry.color }}
            />
          ),
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );

  return (
    <AdminDashboardCard
      title={title}
      subtitle={subtitle}
      className={className}
      contentClassName="flex flex-col"
      exportBaseFileName={`grafico-${title}`}
    >
      <div className={cn('h-[252px] sm:h-[272px]', chartClassName)}>
        {minChartWidthPx > 0 ? (
          <ChartScrollX minWidthPx={minChartWidthPx} className="w-full">
            {chart}
          </ChartScrollX>
        ) : (
          chart
        )}
      </div>

      <AdminDashboardChartLegend
        className="mt-4"
        items={series.map((entry) => ({
          label: entry.label,
          color: entry.color,
        }))}
      />
    </AdminDashboardCard>
  );
}
