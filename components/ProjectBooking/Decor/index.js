import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import urls from "/constants/urls";

function Navigation({ backUrl, backLabel, nextUrl, nextLabel }) {
  const DEFAULT_BACK_LABEL = "Previous";
  const DEFAULT_NEXT_LABEL = "Next";

  return (
    <div
      className={`container d-flex ${nextUrl ? "justify-content-between" : ""}`}
    >
      {backUrl ? (
        <div className="m-4 mr-auto">
          <Link className="theme-btn-s2 rounded-2 px-4" href={backUrl}>
            {backLabel || DEFAULT_BACK_LABEL}
          </Link>
        </div>
      ) : (
        <div />
      )}
      {nextUrl ? (
        <div className="ml-auto m-4">
          <Link className="theme-btn-s4 px-4" href={nextUrl}>
            {nextLabel || DEFAULT_NEXT_LABEL}
          </Link>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default function ProjectBooking({ children }) {
  const DECOR = "decor";
  const SUBMIT = "submit";
  const SITE = "site";
  const FLOOR = "floor";
  const ROOM = "room";

  const paths = usePathname().split("/");

  let backUrl, nextUrl;

  if (paths[paths.length - 1].includes(DECOR)) {
    backUrl = urls.project.booking.getUri();
    nextUrl = urls.project.booking.decor.site.getUri();
  } else if (paths[paths.length - 1].includes(SUBMIT)) {
    backUrl = urls.project.booking.decor.site.getUri();
    nextUrl = urls.project.getUri();
  } else if (paths[paths.length - 1].includes(SITE)) {
    backUrl = urls.project.booking.decor.getUri();
    nextUrl = urls.project.booking.decor.submit.getUri();
  } else if (paths[paths.length - 2].includes(SITE)) {
    backUrl = urls.project.booking.decor.site.getUri();
  } else if (paths[paths.length - 2].includes(FLOOR)) {
    backUrl = urls.project.booking.decor.site.siteNo.getUri(
      paths[paths.length - 1]
    );
  } else if (paths[paths.length - 2].includes(ROOM)) {
    backUrl = urls.project.booking.decor.site.siteNo.floor.floorNo.getUri(
      paths[paths.length - 3],
      paths[paths.length - 1]
    );
  }

  return (
    <div>
      <section
        id="booking-section"
        className="wpo-contact-pg-section section-padding"
      >
        <div className="container">
          {children}
          <div
            className="d-flex justify-content-end mx-4 mt-4"
            style={{ gap: "3rem" }}
          >
            <h4 className="my-auto">Area: 5000m2</h4>
            <h4 className="my-auto">Total price: 50,000,000 VND</h4>
          </div>
        </div>
      </section>
      <Navigation backUrl={backUrl} nextUrl={nextUrl}></Navigation>
    </div>
  );
}
