"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import ConstructionProjectBooking from "/components/ConstructionProjectBooking";

const ConstructionProjectBookingPage = () => {
  return (
    <Fragment>
      <PageTitle
        pageTitle={"Construction Project Booking"}
        pagesub={"Construction Project Booking"}
      />
      <ConstructionProjectBooking />
    </Fragment>
  );
};

export default ConstructionProjectBookingPage;
