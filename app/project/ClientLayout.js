"use client";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "/components/Navbar";
import Footer from "/components/footer/Footer";
import Scrollbar from "/components/Scrollbar";
import Logo from "/public/images/logo.svg";

export default function ClientLayout({ children }) {
  return (
    <div>
      <Navbar Logo={Logo} hclass={"wpo-header-style-2"} />
      {children}
      <Footer ftClass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </div>
  );
}
