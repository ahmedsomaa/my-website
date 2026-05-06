import Hero from "@/components/sections/hero";
import FeaturedWork from "@/components/sections/featured-work";
import CapabilitiesSection from "@/components/sections/capabilities-section";
import SelectedExperienceSnapshot from "@/components/sections/selected-experience-snapshot";
import BlogPreview from "@/components/sections/blog-preview";
import EngineeringPhilosophy from "@/components/sections/engineering-philosophy";
import Testimonials from "@/components/sections/testimonials";
import HomeConnect from "@/components/sections/home-connect";

const Index = () => (
  <>
    <Hero />
    <FeaturedWork />
    <CapabilitiesSection />
    <SelectedExperienceSnapshot />
    <EngineeringPhilosophy />
    <Testimonials />
    <BlogPreview />
    <HomeConnect />
  </>
);

export default Index;
