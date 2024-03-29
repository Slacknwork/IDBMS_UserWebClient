"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Navbar from "/components/Navbar";
import Scrollbar from "/components/Scrollbar";
import Footer from "/components/Footer";

export default function ClientLayout({ children }) {
  return (
    <div>
      <Navbar hclass={"wpo-header-style"} />
      <div style={{ backgroundColor: "#ffffff" }}>{children}</div>
      <Footer ftClass={"wpo-site-footer"} />
      <Scrollbar />
      <ToastContainer />
    </div>
  );
}
