"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import ProjectList from "/components/ProjectList";

const ProjectListPage = () => {
  return (
    <Fragment>
      <PageTitle pageTitle={"Project List"} pagesub={"Project List"} />
      <ProjectList></ProjectList>
    </Fragment>
  );
};

export default ProjectListPage;
