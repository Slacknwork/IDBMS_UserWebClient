"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Navbar from "/components/Navbar";
import Scrollbar from "/components/Scrollbar";
import Footer from "/components/footer/Footer";

export default function ClientLayout({ children }) {
  return (
    <div>
      <Navbar hclass={"wpo-header-style"} />
      <div style={{ backgroundColor: "#f0f0f0" }}>{children}</div>
      <Footer ftClass={"wpo-site-footer"} />
      <Scrollbar />
      <ToastContainer />
    </div>
  );
}
