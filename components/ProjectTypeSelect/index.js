import React from "react";
import Link from "next/link";

const ProjectTypeSelect = (props) => {
  return (
    <div className={`wpo-service-area section-padding ${props.sClass}`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wpo-service-item">
              <i></i>
              <h2>Decor Project</h2>
              <p>Book Architects to make an Interior Decor Project</p>
              <Link href="/project/booking/decor">Book</Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wpo-service-item">
              <i></i>
              <h2>Construction Project</h2>
              <p>Book IDT to build on an existing Design</p>
              <Link href="/project/booking/construction">Book</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTypeSelect;
