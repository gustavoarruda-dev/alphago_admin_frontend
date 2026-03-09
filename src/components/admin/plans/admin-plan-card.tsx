import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdminPlanCard as AdminPlanCardType } from '@/data/admin-plans';

export function AdminPlanCard({
  plan,
}: {
  plan: AdminPlanCardType;
}) {
  return (
    <article
      className={cn(
        'relative rounded-[28px] border px-5 py-5 shadow-[0_18px_36px_rgba(0,0,0,0.16)] backdrop-blur-[28px]',
        plan.highlighted && 'pt-7',
        plan.accentClassName,
      )}
    >
      {plan.highlighted && plan.badgeLabel ? (
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex h-8 items-center rounded-full bg-[linear-gradient(180deg,#F3A124,#C8740D)] px-4 text-[12px] font-semibold text-white shadow-[0_8px_24px_rgba(201,121,20,0.35)]">
            {plan.badgeLabel}
          </span>
        </div>
      ) : null}

      <div className="absolute right-4 top-4 inline-flex size-4 rounded-full border border-white/25 bg-white/12" />

      <div className="relative z-10">
        <h3 className="text-[18px] font-semibold text-white">{plan.name}</h3>
        <p className="mt-1 text-[12px] text-white/62">{plan.subtitle}</p>
        <p className="mt-2 text-[16px] font-semibold text-white">{plan.trialLabel}</p>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/82">
          {plan.sectionTitle}
        </p>

        <div className="mt-4 space-y-0">
          {plan.features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center justify-between border-t border-white/10 py-3"
            >
              <span className="text-[13px] text-white/70">{feature.label}</span>
              {feature.included ? (
                <CheckCircle2 className="size-4 text-[#11E18B]" />
              ) : (
                <XCircle className="size-4 text-[#FF2E55]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
