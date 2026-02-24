import DataCoverage from "@/components/landing/data-coverage";
import DashboardPreview from "@/components/landing/dashboard-preview";
import DeveloperDocs from "@/components/landing/developer-docs";
import FinalCta from "@/components/landing/final-cta";
import Hero from "@/components/landing/hero";
import UseCases from "@/components/landing/use-cases";

export default function LandingPage() {
  return (
    <main className="relative overflow-x-clip bg-bg-00 text-text-main">
      <DecorativeBackground />
      <Hero />
      <DataCoverage />
      <UseCases />
      <DeveloperDocs />
      <DashboardPreview />
      <FinalCta />
    </main>
  );
}

function DecorativeBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-text-primary/12 blur-3xl" />
      <div className="absolute right-[-8rem] top-[28rem] h-[26rem] w-[26rem] rounded-full bg-title-primary/12 blur-3xl" />
      <div className="absolute left-[-10rem] top-[56rem] h-[30rem] w-[30rem] rounded-full bg-text-primary/10 blur-3xl" />
    </div>
  );
}
