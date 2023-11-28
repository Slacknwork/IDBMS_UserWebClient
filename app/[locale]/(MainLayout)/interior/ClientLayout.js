"use client";

import "react-toastify/dist/ReactToastify.css";
import PageTitle from "/components/PageTitle";

export default function ClientLayout({ children }) {
  return (
    <div>
      <PageTitle pageTitle={"Interior items"} pagesub={"Interior"} />
      {children}
    </div>
  );
}
