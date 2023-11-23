"use client";

import React from "react";
import PageTitle from "/components/PageTitle";
import ProjectList from "/components/ProjectList";

export default function ProjectPage() {
  return (
    <div>
      <PageTitle pageTitle={"Project List"} pagesub={"Project List"} />
      <ProjectList></ProjectList>
    </div>
  );
}
