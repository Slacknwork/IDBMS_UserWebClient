"use client";

import React from "react";
import Navbar from "/components/Navbar";
import Hero5 from "/components/hero5";
import ProjectSectionS4 from "/components/ProjectsS4";
import ServiceSection3 from "/components/Services3";
import Scrollbar from "/components/Scrollbar";
import Pricing from "/components/Pricing";
import Logo from "/public/images/logo.svg";
import About from "/components/about/about";
import BlogSectionS2 from "/components/BlogSectionS2";
import Footer from "/components/footer/Footer";
import abimg from "/public/images/about6.png";

const HomePage = () => {
  return (
    <div>
      <Navbar Logo={Logo} hclass={"wpo-header-style-3"} />
      <Hero5 />
      <About abClass={"wpo-about-area-s5"} abimg={abimg} />
      <ServiceSection3 />
      <ProjectSectionS4 />
      <Pricing pClass={"wpo-pricing-section-s2"} />
      <BlogSectionS2 />
      <Footer ftClass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </div>
  );
};
export default HomePage;
