"use client";

import PageTitle from "/components/PageTitle";
import DecorProjectBooking from "/components/ProjectBooking/Decor";

export default function ClientLayout({ children }) {
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <PageTitle
        pageTitle={"Decor Project Booking"}
        pagesub={"Decor Project Booking"}
      />
      <DecorProjectBooking>{children}</DecorProjectBooking>
    </div>
  );
}
