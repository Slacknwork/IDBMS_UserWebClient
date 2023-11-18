"use client";

import React, { Fragment } from "react";

import PageTitle from "/components/PageTitle";
import ProjectBooking from "/components/ProjectBooking";
import Navigation from "/components/ProjectBooking/Navigation";
import BookingRoomDetails from "/components/ProjectBooking/BookingRoomDetails";
import url from "/constants/url";

export default function ProjectBookingSite({ params }) {
  const BACK_URL = `${url.routes.PROJECT}${url.routes.BOOKING}/${params.type}${url.routes.SITE}/${params.siteNo}${url.routes.FLOOR}/${params.floorNo}${url.id.BOOKING_SECTION}`;

  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectBooking>
        <BookingRoomDetails />
      </ProjectBooking>
      <Navigation backUrl={BACK_URL}></Navigation>
    </Fragment>
  );
}
