"use client";

import React, { Fragment } from "react";

import url from "/constants/url";

import PageTitle from "/components/PageTitle";
import ProjectBooking from "/components/ProjectBooking";
import BookingSubmission from "/components/ProjectBooking/BookingSubmission";
import Navigation from "/components/ProjectBooking/Navigation";

const ProjectBookingPage = ({ params }) => {
  const backUrl =
    "/project/booking/" + params.type + "/site" + url.id.BOOKING_SECTION;
  const nextUrl = "/project";

  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectBooking>
        <BookingSubmission category={params.category} />
      </ProjectBooking>
      <Navigation backUrl={backUrl} nextUrl={nextUrl}></Navigation>
    </Fragment>
  );
};

export default ProjectBookingPage;
