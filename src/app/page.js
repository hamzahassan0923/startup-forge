import FeaturedStartups from "@/components/Cards/FeatureStartup";

import Hero from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyStartupForge from "@/components/WhyStartupForge";


export default function Home() {
  return (
   <div>
    <Hero></Hero>
   
    <FeaturedStartups></FeaturedStartups>
    <WhyStartupForge></WhyStartupForge>
  <HowItWorks></HowItWorks>
   </div>
  );
}
