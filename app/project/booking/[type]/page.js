"use client";

import React, { Fragment } from "react";

import PageTitle from "/components/PageTitle";
import ProjectBooking from "/components/ProjectBooking";
import BasicInfoForm from "/components/ProjectBooking/BasicInfoForm";
import Navigation from "/components/ProjectBooking/Navigation";

const ProjectBookingPage = ({ params }) => {
  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectBooking>
        <BasicInfoForm category={params.category} />
      </ProjectBooking>
      <Navigation
        backUrl={"/project/booking"}
        nextUrl={params.type + "/site#booking-section"}
      ></Navigation>
    </Fragment>
  );
};

export default ProjectBookingPage;
