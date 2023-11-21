import React from "react";
import { Link } from "/navigation";

import urls from "/constants/urls";

const SiteItem = () => {
  const siteDetailsUrl = urls.project.booking.decor.site.siteNo.getUri(1);

  return (
    <div className="container">
      <div className="row shadow p-4 my-4 mx-1" style={{ height: "18rem" }}>
        <div className="col-4 col-lg-3 my-auto">
          <div className="shop-img">
            <div style={{ width: "14rem", height: "14rem" }} />
          </div>
        </div>
        <div className="col-8 col-lg-9 d-flex align-items-start justify-content-between">
          <div className="shop-info my-auto">
            <h3 className="">Site name</h3>
            <div className="des">
              <p>Address: 420 Something Street</p>
              <p>Total area: 1000m2</p>
              <p>Total price: 10,000,000 VND</p>
            </div>
          </div>
          <div className="mt-auto d-flex gap-3">
            <div>
              <Link href={siteDetailsUrl} className="theme-btn px-4" replace>
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SiteList({ projectType }) {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Project Sites</h3>
              <div className="d-flex">
                <button className="theme-btn-s4 px-4 py-2">Add</button>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "30rem",
              overflowY: "scroll",
            }}
          >
            <SiteItem projectType={projectType} />
            <SiteItem projectType={projectType} />
            <SiteItem projectType={projectType} />
            <SiteItem projectType={projectType} />
          </div>
        </div>
      </form>
    </div>
  );
}
