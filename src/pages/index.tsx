import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/featured-work";
import CapabilitiesSection from "@/components/sections/capabilities-section";
import Testimonials from "@/components/sections/testimonials";
import HomeConnect from "@/components/sections/home-connect";
import {
  HomeHeroReveal,
  HomeScrollReveal,
} from "@/components/home-section-motion";

const Index = () => (
  <>
    <HomeHeroReveal>
      <Hero />
    </HomeHeroReveal>
    <HomeScrollReveal preset="work">
      <FeaturedWork />
    </HomeScrollReveal>
    <HomeScrollReveal preset="focus">
      <CapabilitiesSection />
    </HomeScrollReveal>
    <HomeScrollReveal preset="voices">
      <Testimonials />
    </HomeScrollReveal>
    <HomeScrollReveal preset="connect">
      <HomeConnect />
    </HomeScrollReveal>
  </>
);

export default Index;
