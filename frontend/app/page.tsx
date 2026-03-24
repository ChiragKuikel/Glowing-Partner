import HeroSection from '../components/HeroSection'
import Navbar from '@/components/navbar';
import PhilosophyPage from '@/components/Philosophy';
import PartnerRibbon from '@/components/Swiper';
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PartnerRibbon />
      <PhilosophyPage />
    </div>
  );
}
