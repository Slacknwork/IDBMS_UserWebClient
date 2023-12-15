"use client";

import PageTitle from "/components/Shared/PageTitle";
import Overview from "/components/About/Overview";
import Projects from "/components/About/Projects";

export default function AboutPage() {
  return (
    <div>
      <PageTitle pageTitle={"About Us"} pagesub={"About"} />
      <Overview />
      <Projects />
    </div>
  );
}
