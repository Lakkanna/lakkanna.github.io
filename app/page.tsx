import TopNavBar from '@/components/TopNavBar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ExperienceSection from '@/components/ExperienceSection';
import Footer from '@/components/Footer';
import Background from '@/components/Background';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden">
      <TopNavBar />
      <Background />
      <div className="relative z-10 flex h-full w-full max-w-5xl grow flex-col px-4 sm:px-6 lg:px-8 py-10 mt-24">
        <main className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <HeroSection />
          <StatsSection />
        </main>
      </div>
      <div className="relative z-0 w-full">
        <ExperienceSection />
      </div>
      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </div>
  );
}
