"use client";

import React, { Fragment } from "react";

import PageTitle from "/components/PageTitle";
import ProjectBooking from "/components/ProjectBooking";
import Navigation from "/components/ProjectBooking/Navigation";
import BookingFloorDetails from "/components/ProjectBooking/BookingFloorDetails";
import url from "/constants/url";

export default function ProjectBookingSite({ params }) {
  const BACK_URL = `${url.routes.PROJECT}${url.routes.BOOKING}/${params.type}${url.routes.SITE}/${params.siteNo}${url.id.BOOKING_SECTION}`;

  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectBooking>
        <BookingFloorDetails />
      </ProjectBooking>
      <Navigation backUrl={BACK_URL}></Navigation>
    </Fragment>
  );
}
