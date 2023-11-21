"use client";

import React, { Fragment } from "react";
import Navbar from "/components/Navbar";
import PageTitle from "/components/PageTitle";
import About from "/components/about/about";
import ProjectSection from "/components/Projects";
import ServiceSection from "/components/Services";
import Pricing from "/components/Pricing";
import FunFact from "/components/FunFact/FunFact";
import TeamSection from "/components/TeamSection";
import Testimonial from "/components/Testimonial";
import Footer from "/components/footer/Footer";
import Scrollbar from "/components/Scrollbar";
import Logo from "/public/images/logo.svg";
import abimg from "/public/images/about.jpg";

const AboutPage = () => {
  return (
    <Fragment>
      <Navbar Logo={Logo} hclass={"wpo-header-style-2"} />
      <PageTitle pageTitle={"About Us"} pagesub={"About"} />
      <About abimg={abimg} />
      <ProjectSection />
      <ServiceSection />
      <FunFact fnClass={"wpo-fun-fact-section-s2"} />
      <Pricing />
      <TeamSection />
      <Testimonial />
      <Footer ftClass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </Fragment>
  );
};
export default AboutPage;
