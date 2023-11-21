"use client";

import React, { Fragment } from "react";
import Navbar from "/components/Navbar";
import PageTitle from "/components/PageTitle";
import Contactpage from "/components/Contactpage";
import Scrollbar from "/components/Scrollbar";
import Footer from "/components/footer/Footer";
import Logo from "/public/images/logo.svg";

const ContactPage = () => {
  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={"Contact Us"} pagesub={"Contact"} />
      <Contactpage />
      <Footer ftClass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </Fragment>
  );
};
export default ContactPage;
