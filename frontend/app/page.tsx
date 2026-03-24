import HeroSection from '../components/HeroSection'
import Navbar from '@/components/navbar';
import PartnerRibbon from '@/components/Swiper';
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PartnerRibbon />
    </div>
  );
}
