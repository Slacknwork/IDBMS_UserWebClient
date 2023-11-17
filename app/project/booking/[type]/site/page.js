"use client";

import React, { Fragment } from "react";

import url from "/constants/url";

import PageTitle from "/components/PageTitle";
import ProjectBooking from "/components/ProjectBooking";
import BookingSiteList from "/components/ProjectBooking/BookingSiteList";
import Navigation from "/components/ProjectBooking/Navigation";

export default function ProjectBookingSite({ params }) {
  const BASE_URL = `${url.routes.PROJECT}${url.routes.BOOKING}/${params.type}`;

  const BACK_URL = `${BASE_URL}${url.id.BOOKING_SECTION}`;
  const NEXT_URL = `${BASE_URL}${url.routes.SUBMIT}${url.id.BOOKING_SECTION}`;

  return (
    <Fragment>
      <PageTitle pageTitle={"Project Booking"} pagesub={"Project Booking"} />
      <ProjectBooking>
        <BookingSiteList projectType={params.type} />
      </ProjectBooking>
      <Navigation backUrl={BACK_URL} nextUrl={NEXT_URL}></Navigation>
    </Fragment>
  );
}
