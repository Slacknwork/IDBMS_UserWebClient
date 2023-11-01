"use client";

import React from "react";
import Navbar from "/components/Navbar";
import ErrorComponent from "/components/404";
import Footer from "/components/footer/Footer";
import Scrollbar from "/components/Scrollbar";
import Logo from "/public/images/logo.svg";

const NotFoundPage = () => {
  return (
    <div>
      <Navbar Logo={Logo} hclass={"wpo-header-style-2"} />
      <ErrorComponent />
      <Footer ftClass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </div>
  );
};
export default NotFoundPage;