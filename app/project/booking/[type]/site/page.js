"use client";

import React, { Fragment } from "react";

import url from "/constants/url";

import PageTitle from "/components/PageTitle";
import ProjectBooking from "/components/ProjectBooking";
import BookingSiteList from "/components/ProjectBooking/BookingSiteList";
import Navigation from "/components/ProjectBooking/Navigation";

export default function ProjectBookingSite({ params }) {
  const backUrl = "/project/booking/" + params.type + url.id.BOOKING_SECTION;
  const nextUrl =
    "/project/booking/" + params.type + "/submit" + url.id.BOOKING_SECTION;

  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectBooking>
        <BookingSiteList />
      </ProjectBooking>
      <Navigation backUrl={backUrl} nextUrl={nextUrl}></Navigation>
    </Fragment>
  );
}
