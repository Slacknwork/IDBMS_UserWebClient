"use client";

import PageTitle from "/components/Shared/PageTitle";
import Overview from "/components/About/Overview";
import Projects from "/components/About/Projects";
import Contact from "/components/About/Contact";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div>
      <PageTitle pageTitle={t("AboutUs")} pagesub={t("AboutUs")} />
      <Overview />
      <Projects />
      <Contact />
    </div>
  );
}
