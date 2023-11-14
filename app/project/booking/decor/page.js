"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import DecorProjectBooking from "/components/DecorProjectBooking";

const ProjectBookingPage = () => {
  return (
    <Fragment>
      <PageTitle
        pageTitle={"Decor Project Booking"}
        pagesub={"Decor Project Booking"}
      />
      <DecorProjectBooking />
    </Fragment>
  );
};

export default ProjectBookingPage;
