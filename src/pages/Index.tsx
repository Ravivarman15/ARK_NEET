import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FreeBooksBanner from '@/components/FreeBooksBanner';
import AboutProgramme from '@/components/AboutProgramme';
import Subjects from '@/components/Subjects';
import WhoShouldJoin from '@/components/WhoShouldJoin';
import ProgrammeStructure from '@/components/ProgrammeStructure';
import PerformanceTracking from '@/components/PerformanceTracking';
import OfflineProgramme from '@/components/OfflineProgramme';
import OnlineProgramme from '@/components/OnlineProgramme';
import ProgrammeOptions from '@/components/ProgrammeOptions';
import BookletInformation from '@/components/BookletInformation';
import Booklets from '@/components/Booklets';
import StudentOutcomes from '@/components/StudentOutcomes';
import WhyARK from '@/components/WhyARK';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CheckoutModal from '@/components/CheckoutModal';
import { useCheckout } from '@/hooks/useCheckout';

const Index = () => {
  const { isOpen, selectedProduct, openCheckout, closeCheckout } = useCheckout();

  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <FreeBooksBanner />
      <AboutProgramme />
      <Subjects />
      <WhoShouldJoin />
      <ProgrammeStructure />
      <PerformanceTracking />
      <OfflineProgramme />
      <OnlineProgramme />
      <ProgrammeOptions />
      <BookletInformation />
      <Booklets onBuyClick={openCheckout} />
      <StudentOutcomes />
      <WhyARK />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <CheckoutModal product={selectedProduct} isOpen={isOpen} onClose={closeCheckout} />
    </main>
  );
};

export default Index;
