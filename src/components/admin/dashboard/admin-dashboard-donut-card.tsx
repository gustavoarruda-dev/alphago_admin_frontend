import type { ReactElement } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { AdminDonutDatum } from '@/data/admin-chart';
import { AdminDashboardCard } from './admin-dashboard-card';
import { AdminDashboardChartLegend } from './admin-dashboard-chart-legend';

type AdminDashboardDonutCardProps = {
  title: string;
  data: AdminDonutDatum[];
  valueFormatter?: (value: number) => string;
};

function DonutTooltip({
  active,
  payload,
  valueFormatter,
}: {
  active?: boolean;
  payload?: Array<{
    value?: number;
    payload?: AdminDonutDatum;
  }>;
  valueFormatter: (value: number) => string;
}): ReactElement | null {
  const item = payload?.[0]?.payload;
  const value = payload?.[0]?.value;

  if (!active || !item || typeof value !== 'number') return null;

  return (
    <div className="rounded-2xl border border-white/10 px-3 py-2 card-gradient-bg-modal shadow-[0px_10px_30px_rgba(0,0,0,0.22)]">
      <div className="flex items-center gap-2">
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: item.color }}
          aria-hidden
        />
        <span className="text-[12px] text-foreground/75 dark:text-white/60">
          {item.name}
        </span>
      </div>
      <p className="mt-1 text-[12px] font-semibold text-foreground dark:text-white">
        {valueFormatter(value)}
      </p>
    </div>
  );
}

export function AdminDashboardDonutCard({
  title,
  data,
  valueFormatter = (value) => `${value.toLocaleString('pt-BR')} Tokens`,
}: AdminDashboardDonutCardProps) {
  const primarySegment = [...data].sort((left, right) => right.value - left.value)[0];

  return (
    <AdminDashboardCard
      title={title}
      contentClassName="flex flex-col"
      exportBaseFileName={`grafico-${title}`}
    >
      <div className="h-[210px] sm:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<DonutTooltip valueFormatter={valueFormatter} />} />
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="hsl(var(--foreground))"
              className="dark:fill-white"
            >
              <tspan x="50%" dy="-0.2em" fontSize="12" fontWeight="700">
                {primarySegment?.name ?? '-'}
              </tspan>
              <tspan
                x="50%"
                dy="1.4em"
                fontSize="11"
                fill="var(--yaxis-color)"
              >
                {primarySegment ? valueFormatter(primarySegment.value) : '-'}
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <AdminDashboardChartLegend
        className="mt-4"
        items={data.map((entry) => ({
          label: entry.name,
          color: entry.color,
        }))}
      />
    </AdminDashboardCard>
  );
}
