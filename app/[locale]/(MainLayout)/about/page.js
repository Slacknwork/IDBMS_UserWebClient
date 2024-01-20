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
      <div style={{ width: "100%" }}>
        <iframe
          width="100%"
          height="600"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=721%20Phan%20Van%20Tri+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.maps.ie/population/">Population Estimator map</a>
        </iframe>
      </div>
    </div>
  );
}
