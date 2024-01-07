"use client";

import "react-toastify/dist/ReactToastify.css";
import PageTitle from "/components/PageTitle";
import { useTranslations } from "next-intl";

export default function ClientLayout({ children }) {
  const t = useTranslations("Header");

  return (
    <div>
      <PageTitle pageTitle={t("InteriorItem")} pagesub={t("Interior")} />
      {children}
    </div>
  );
}
