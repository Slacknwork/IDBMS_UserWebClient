"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import ProjectTypeSelect from "/components/ProjectTypeSelect";

const ProjectBookingPage = () => {
  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectTypeSelect />
    </Fragment>
  );
};

export default ProjectBookingPage;
