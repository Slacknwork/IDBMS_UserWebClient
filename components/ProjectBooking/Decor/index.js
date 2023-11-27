import React, { useState, useEffect, useRef } from "react";
import { Link } from "/navigation";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import urls from "/constants/urls";

import { setBasicInfo } from "/store/reducers/draftProject";
import { getAllProjectDesigns } from "/api/projectDesignServices";

function Navigation({ backUrl, backLabel, nextUrl, nextLabel }) {
  const DEFAULT_BACK_LABEL = "Back";
  const DEFAULT_NEXT_LABEL = "Next";

  return (
    <div
      className={`container d-flex ${nextUrl ? "justify-content-between" : ""}`}
    >
      {backUrl ? (
        <div className="mr-auto">
          <Link
            className="theme-btn py-2"
            href={backUrl}
            style={{ width: "5rem" }}
          >
            {backLabel || DEFAULT_BACK_LABEL}
          </Link>
        </div>
      ) : (
        <div />
      )}
      {nextUrl ? (
        <div className="ml-auto">
          <Link
            className="theme-btn py-2"
            href={nextUrl}
            style={{ width: "5rem" }}
          >
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

  const dispatch = useDispatch();
  const draftProject = useSelector((state) => state.draftProject);

  let backUrl, nextUrl;

  if (paths[paths.length - 1].includes(DECOR)) {
    backUrl = urls.project.booking.getUri();
    nextUrl = urls.project.booking.decor.site.getUri();
  } else if (paths[paths.length - 1].includes(SUBMIT)) {
    backUrl = urls.project.booking.decor.site.getUri();
  } else if (paths[paths.length - 1].includes(SITE)) {
    backUrl = urls.project.booking.decor.getUri();
    nextUrl = urls.project.booking.decor.submit.getUri();
  } else if (paths[paths.length - 2].includes(SITE)) {
    backUrl = urls.project.booking.decor.site.getUri();
  } else if (paths[paths.length - 2].includes(FLOOR)) {
    backUrl = urls.project.booking.decor.site.siteNo.getUri(
      paths[paths.length - 3]
    );
  } else if (paths[paths.length - 2].includes(ROOM)) {
    backUrl = urls.project.booking.decor.site.siteNo.floor.floorNo.getUri(
      paths[paths.length - 5],
      paths[paths.length - 3]
    );
  }

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getAllProjectDesigns();
          dispatch(setBasicInfo({ projectDesigns: data }));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-9 col-12">
          <section
            id="booking-section"
            className="wpo-contact-pg-section section-padding"
          >
            <div
              className="wpo-contact-form-area"
              style={{ marginBottom: "4rem" }}
            >
              <Navigation backUrl={backUrl} nextUrl={nextUrl}></Navigation>
              <div className="mt-4">{children}</div>
            </div>
          </section>
        </div>
        <div className="col col-lg-3 col-12">
          <section className="section-padding">
            <div className="shadow p-4" style={{ backgroundColor: "white" }}>
              <div className="mb-4">
                <p className="my-auto">
                  Area: {draftProject.totalArea} m<sup>2</sup>
                </p>
                <p className="my-auto">
                  Estimate Business Days: {draftProject.estimateBusinessDay}{" "}
                  days
                </p>
                <h5 className="my-auto pt-4">
                  Total price: {draftProject.totalPrice.toLocaleString("vi-VN")}{" "}
                  VND
                </h5>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
