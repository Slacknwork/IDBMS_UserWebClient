"use client";

import Hero from "/components/Home/Hero";
import About from "/components/Home/About";
import Services from "/components/Home/Services";
import Pricing from "/components/Home/Pricing";
import Projects from "/components/Home/Projects";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Projects />
    </div>
  );
};
export default HomePage;
