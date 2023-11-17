"use client";

import React, { Fragment } from "react";

import PageTitle from "/components/PageTitle";
import ProjectBooking from "/components/ProjectBooking";
import BookingSubmission from "/components/ProjectBooking/BookingSubmission";
import Navigation from "/components/ProjectBooking/Navigation";
import url from "/constants/url";

const ProjectBookingPage = ({ params }) => {
  const NEXT_URL = "/project";
  const BACK_URL = `${url.routes.PROJECT}${url.routes.BOOKING}/${params.type}${url.routes.SITE}${url.id.BOOKING_SECTION}`;

  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectBooking>
        <BookingSubmission category={params.category} />
      </ProjectBooking>
      <Navigation backUrl={BACK_URL} nextUrl={NEXT_URL}></Navigation>
    </Fragment>
  );
};

export default ProjectBookingPage;
