"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import ProjectBooking from "/components/ProjectBooking";

const ProjectBookingPage = ({ params }) => {
  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectBooking category={params.category} />
    </Fragment>
  );
};

export default ProjectBookingPage;
