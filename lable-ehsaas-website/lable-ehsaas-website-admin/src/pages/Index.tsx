import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import BrandStorySection from "@/components/BrandStorySection";
import LatestCollectionsSection from "@/components/LatestCollectionsSection";
import NewArrivalsSection, { BestSellersSection } from "@/components/NewArrivalsSection";
import SignatureLooksSection from "@/components/SignatureLooksSection";
import SeasonalBanner from "@/components/SeasonalBanner";
import ValueProps from "@/components/ValueProps";
import ReviewsSection from "@/components/ReviewsSection";
import InstagramSection from "@/components/InstagramSection";
import NewsletterSection from "@/components/NewsletterSection";
import SiteFooter from "@/components/SiteFooter";
import FestiveCollection from "@/components/FestiveCollection";

const Index = () => {
  return (
    <div className="page-fade-in">
      <SiteHeader />
      <main>
        <HeroSection />
     
        <CategoriesSection />
        <BrandStorySection />
        <LatestCollectionsSection />
        <NewArrivalsSection />
         <BestSellersSection />
         <FestiveCollection/>
        {/* <SignatureLooksSection /> */}
        <SeasonalBanner />
      
        
        <ReviewsSection />
           {/* <ValueProps /> */}
        <InstagramSection />
        {/* <NewsletterSection /> */}
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
