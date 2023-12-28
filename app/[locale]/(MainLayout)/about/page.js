"use client";

import PageTitle from "/components/Shared/PageTitle";
import Overview from "/components/About/Overview";
import Projects from "/components/About/Projects";
import Contact from "/components/About/Contact";

export default function AboutPage() {
  return (
    <div>
      <PageTitle pageTitle={"About Us"} pagesub={"About"} />
      <Overview />
      <Projects />
      <Contact />
    </div>
  );
}
