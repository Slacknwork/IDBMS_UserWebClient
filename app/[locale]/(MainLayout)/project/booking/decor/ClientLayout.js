"use client";

import PageTitle from "/components/PageTitle";
import DecorProjectBooking from "/components/ProjectBooking/Construction";

export default function ClientLayout({ children }) {
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <PageTitle
        pageTitle={"Construction Project Booking"}
        pagesub={"Construction Project Booking"}
      />
      <DecorProjectBooking>{children}</DecorProjectBooking>
    </div>
  );
}
