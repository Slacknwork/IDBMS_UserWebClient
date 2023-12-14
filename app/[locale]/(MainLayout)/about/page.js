"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import About from "/components/about";
import ProjectSection from "/components/Projects";
import ServiceSection from "/components/Services";
import Pricing from "/components/Home/Pricing";
import FunFact from "/components/FunFact/FunFact";
import TeamSection from "/components/TeamSection";
import Testimonial from "/components/Testimonial";
import abimg from "/public/images/about.jpg";

const AboutPage = () => {
  return (
    <Fragment>
      <PageTitle pageTitle={"About Us"} pagesub={"About"} />
      <About abimg={abimg} />
      <ProjectSection />
      <ServiceSection />
      <FunFact fnClass={"wpo-fun-fact-section-s2"} />
      <Pricing />
      <TeamSection />
      <Testimonial />
    </Fragment>
  );
};
export default AboutPage;
