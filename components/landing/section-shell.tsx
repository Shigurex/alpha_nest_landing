import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-14 md:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-8 space-y-3 md:mb-10">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.2em] text-text-primary md:text-sm">{eyebrow}</p>
          ) : null}
          <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-title-dark md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-3xl text-sm text-text-sub md:text-base">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
