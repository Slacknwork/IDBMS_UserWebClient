import React from "react";
import Link from "next/link";

import urls from "/constants/urls";

const SiteItem = () => {
  const siteDetailsUrl = urls.project.id.site.siteNo.getUri(1, 1);

  return (
    <div className="container">
      <div
        className="row shadow p-4 my-4 mx-1"
        style={{ height: "18rem", backgroundColor: "white" }}
      >
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
    <div className="container pb-0">
      <form className="contact-validation-active">
        <div className="row justify-content-center">
          <div className="col col-lg-10 col-12 mb-4">
            <div className="d-flex justify-content-between mb-4">
              <h3 className="my-auto">Project Sites</h3>
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
        </div>
      </form>
    </div>
  );
}
