"use client";

import PageTitle from "/components/PageTitle";
import ProjectDetail from "/components/ProjectDetails";

import { useTranslations } from "next-intl";

export default function ClientLayout({ children }) {
  const t = useTranslations("Project");

  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <PageTitle pageTitle={t("Details")} pagesub={"Project"} />
      <ProjectDetail>{children}</ProjectDetail>
    </div>
  );
}
