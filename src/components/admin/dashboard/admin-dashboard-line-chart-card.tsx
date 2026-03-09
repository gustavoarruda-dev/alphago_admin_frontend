import type { ReactElement } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartScrollX } from '@/components/charts/chart-scroll-x';
import { cn } from '@/lib/utils';
import type {
  AdminLineDatum,
  AdminLineSeries,
} from '@/data/admin-chart';
import { AdminDashboardCard } from './admin-dashboard-card';
import { AdminDashboardChartLegend } from './admin-dashboard-chart-legend';

type AdminDashboardLineChartCardProps = {
  title: string;
  subtitle?: string;
  data: AdminLineDatum[];
  series: AdminLineSeries[];
  className?: string;
  chartClassName?: string;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number, series: AdminLineSeries) => string;
  yAxisFormatter?: (value: number) => string;
  xTickAngle?: number;
  xTickHeight?: number;
  xTickDy?: number;
  xTickMargin?: number;
  xAxisInterval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
  chartBottomMargin?: number;
  chartTopMargin?: number;
  chartLeftMargin?: number;
  chartRightMargin?: number;
  yAxisWidth?: number;
  minChartWidthPx?: number;
  showLegend?: boolean;
  headerAction?: ReactElement;
};

function DefaultTooltip({
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
  series: AdminLineSeries[];
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number, series: AdminLineSeries) => string;
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

export function AdminDashboardLineChartCard({
  title,
  subtitle,
  data,
  series,
  className,
  chartClassName,
  labelFormatter,
  valueFormatter,
  yAxisFormatter = (value) => value.toLocaleString('pt-BR'),
  xTickAngle = 0,
  xTickHeight = 40,
  xTickDy = 0,
  xTickMargin = 8,
  xAxisInterval = 'preserveStartEnd',
  chartBottomMargin = 4,
  chartTopMargin = 8,
  chartLeftMargin = 2,
  chartRightMargin = 12,
  yAxisWidth = 64,
  minChartWidthPx = 0,
  showLegend = true,
  headerAction,
}: AdminDashboardLineChartCardProps) {
  const chart = (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: chartTopMargin,
          right: chartRightMargin,
          left: chartLeftMargin,
          bottom: chartBottomMargin,
        }}
      >
        <CartesianGrid stroke="var(--grid-line)" strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          height={xTickHeight}
          interval={xAxisInterval}
          tickMargin={xTickMargin}
          tick={{
            fill: 'var(--yaxis-color)',
            fontSize: 11,
            dy: xTickDy,
          }}
          angle={xTickAngle}
          textAnchor={xTickAngle ? 'end' : 'middle'}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={yAxisWidth}
          tick={{
            fill: 'var(--yaxis-color)',
            fontSize: 11,
          }}
          tickFormatter={yAxisFormatter}
        />
        <Tooltip
          cursor={{ stroke: 'rgba(255,255,255,0.12)', strokeDasharray: '4 4' }}
          content={
            <DefaultTooltip
              series={series}
              labelFormatter={labelFormatter}
              valueFormatter={valueFormatter}
            />
          }
        />
        {series.map((entry) => (
          <Line
            key={entry.dataKey}
            type="monotone"
            dataKey={entry.dataKey}
            stroke={entry.color}
            strokeWidth={entry.strokeWidth ?? 2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: entry.color }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <AdminDashboardCard
      title={title}
      subtitle={subtitle}
      className={className}
      contentClassName="flex flex-col"
      exportBaseFileName={`grafico-${title}`}
      headerAction={headerAction}
    >
      <div className={cn('h-[210px] sm:h-[230px]', chartClassName)}>
        {minChartWidthPx > 0 ? (
          <ChartScrollX minWidthPx={minChartWidthPx} className="w-full">
            {chart}
          </ChartScrollX>
        ) : (
          chart
        )}
      </div>

      {showLegend ? (
        <AdminDashboardChartLegend
          className="mt-4"
          items={series.map((entry) => ({
            label: entry.label,
            color: entry.color,
          }))}
        />
      ) : null}
    </AdminDashboardCard>
  );
}
