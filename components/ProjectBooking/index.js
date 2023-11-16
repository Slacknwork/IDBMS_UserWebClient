import React from "react";

const ProjectBooking = ({ children }) => {
  return (
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
  );
};

export default ProjectBooking;
