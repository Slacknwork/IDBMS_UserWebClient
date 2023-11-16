"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import ProjectDetail from "/components/ProjectDetail";
import Projects from "/api/project";

const ProjectSinglePage = ({ params }) => {
  const projectDetails = Projects.find((item) => item.slug === params.slug);

  return (
    <Fragment>
      <PageTitle pageTitle={projectDetails?.title} pagesub={"Project"} />
      <ProjectDetail></ProjectDetail>
    </Fragment>
  );
};
export default ProjectSinglePage;
