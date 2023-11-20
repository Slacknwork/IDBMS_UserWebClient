"use client";

import PageTitle from "/components/PageTitle";
import ProjectDetail from "/components/ProjectDetail";

export default function ClientLayout({ children }) {
  return (
    <div>
      <PageTitle pageTitle={"Tasks"} pagesub={"Project"} />
      <ProjectDetail>{children}</ProjectDetail>
    </div>
  );
}
