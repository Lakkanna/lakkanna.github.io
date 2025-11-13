export default function StatsSection() {
  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-2 rounded-xl border border-border-light bg-card-light p-6 text-left shadow-lg shadow-black/[0.02] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04] dark:border-border-dark dark:bg-card-dark dark:shadow-black/20 dark:hover:shadow-black/30">
        <p className="text-base font-medium text-content-light/80 dark:text-content-dark/80">Years of Experience</p>
        <p className="text-2xl font-bold tracking-tight text-content-light dark:text-white">7+</p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-border-light bg-card-light p-6 text-left shadow-lg shadow-black/[0.02] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04] dark:border-border-dark dark:bg-card-dark dark:shadow-black/20 dark:hover:shadow-black/30">
        <p className="text-base font-medium text-content-light/80 dark:text-content-dark/80">Core Technologies</p>
        <p className="text-2xl font-bold tracking-tight text-content-light dark:text-white">React / Next.js / AI</p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-border-light bg-card-light p-6 text-left shadow-lg shadow-black/[0.02] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04] dark:border-border-dark dark:bg-card-dark dark:shadow-black/20 dark:hover:shadow-black/30">
        <p className="text-base font-medium text-content-light/80 dark:text-content-dark/80">Key Achievement</p>
        <p className="text-2xl font-bold tracking-tight text-content-light dark:text-white">Led 3+ Product Teams</p>
      </div>
    </div>
  )
}

