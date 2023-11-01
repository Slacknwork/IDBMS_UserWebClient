"use client";

import React, { Fragment } from "react";
import Navbar from "/components/Navbar";
import PageTitle from "/components/PageTitle";
import ProjectsS2 from "/components/ProjectsS2";
import Scrollbar from "/components/Scrollbar";
import Footer from "/components/footer/Footer";
import Logo from "/public/images/logo.svg";

const ProjectPage = () => {
  return (
    <Fragment>
      <Navbar Logo={Logo} hclass={"wpo-header-style-2"} />
      <PageTitle pageTitle={"Projects"} pagesub={"Projects"} />
      <ProjectsS2 />
      <Footer ftClass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </Fragment>
  );
};
export default ProjectPage;
