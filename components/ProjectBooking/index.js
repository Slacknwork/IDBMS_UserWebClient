import React, { useState } from "react";
import Link from "next/link";

import BasicInfoForm from "./BasicInfoForm";
import SiteForm from "./SiteForm";

const ProjectBooking = ({ category }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabChangeHandler = (value) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveTab((prev) => prev + value);
  };

  const formElements = [<BasicInfoForm />, <SiteForm />];

  return (
    <section
      id="booking-section"
      className="wpo-contact-pg-section section-padding"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div className="container">
        {formElements[activeTab]}
        <div
          className="d-flex justify-content-end mx-4 mt-4"
          style={{ gap: "3rem" }}
        >
          <h4 className="my-auto">Area: 5000m2</h4>
          <h4 className="my-auto">Total price: 50,000,000 VND</h4>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex m-4">
            {activeTab > 0 ? (
              <Link
                onClick={() => tabChangeHandler(-1)}
                className="theme-btn-s2 rounded-2 px-4"
                href={"#booking-section"}
              >
                Back
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className="d-flex m-4">
            {activeTab < formElements.length - 1 ? (
              <Link
                onClick={() => tabChangeHandler(1)}
                className="theme-btn-s4 px-4"
                href={"#booking-section"}
              >
                Next
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectBooking;
