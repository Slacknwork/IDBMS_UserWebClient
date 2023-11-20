"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import ProjectDetail from "/components/ProjectDetail";

const ProjectSinglePage = ({ params }) => {
  return (
    <Fragment>
      <PageTitle pageTitle={params.id} pagesub={"Project"} />
      <ProjectDetail></ProjectDetail>
    </Fragment>
  );
};
export default ProjectSinglePage;
