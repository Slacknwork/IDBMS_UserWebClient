"use client";

import "react-toastify/dist/ReactToastify.css";
import PageTitle from "/components/PageTitle";
import { useTranslations } from "next-intl";

export default function ClientLayout({ children }) {
  // const t = useTranslations("Bookmark");

  return (
    <div>
      <PageTitle pageTitle={"Bookmark"} pagesub={"Bookmark"} />
      {children}
    </div>
  );
}
