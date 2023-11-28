"use client";

import PageTitle from "/components/PageTitle";
import ConstructionProjectBooking from "/components/ProjectBooking/Construction";

export default function ClientLayout({ children }) {
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <PageTitle
        pageTitle={"Construction Project Booking"}
        pagesub={"Construction Project Booking"}
      />
      <ConstructionProjectBooking>{children}</ConstructionProjectBooking>
    </div>
  );
}
