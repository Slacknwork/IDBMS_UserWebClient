"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import DecorProjectBooking from "/components/DecorProjectBooking";

const DecorProjectBookingPage = () => {
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

export default DecorProjectBookingPage;
