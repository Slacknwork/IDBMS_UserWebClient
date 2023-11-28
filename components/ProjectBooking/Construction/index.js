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
  const CONSTRUCTION = "construction";
  const RESOURCES = "resources";

  const paths = usePathname().split("/");

  const dispatch = useDispatch();

  let backUrl, nextUrl;

  if (paths[paths.length - 1].includes(CONSTRUCTION)) {
    backUrl = urls.project.booking.getUri();
    nextUrl = urls.project.booking.construction.resources.getUri();
  } else if (paths[paths.length - 1].includes(RESOURCES)) {
    backUrl = urls.project.booking.construction.getUri();
    nextUrl = urls.project.booking.construction.submit.getUri();
  } else {
    backUrl = urls.project.booking.construction.resources.getUri();
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
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
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
      </div>
    </div>
  );
}
