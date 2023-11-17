"use client";

import React, { Fragment } from "react";

import PageTitle from "/components/PageTitle";
import ProjectBooking from "/components/ProjectBooking";
import Navigation from "/components/ProjectBooking/Navigation";
import BookingSiteDetails from "/components/ProjectBooking/BookingSiteDetails";
import url from "/constants/url";

export default function ProjectBookingSite({ params }) {
  const BACK_URL = `${url.routes.PROJECT}${url.routes.BOOKING}/${params.type}${url.routes.SITE}${url.id.BOOKING_SECTION}`;

  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectBooking>
        <BookingSiteDetails />
      </ProjectBooking>
      <Navigation backUrl={BACK_URL}></Navigation>
    </Fragment>
  );
}
