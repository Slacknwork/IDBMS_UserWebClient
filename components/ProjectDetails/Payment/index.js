"use client";

import Tabs from "/components/Tabs";

export default function ProjectDetail({ children }) {
  const tabs = [
    {
      path: "",
      label: "Stages",
    },
    {
      path: "transactions",
      label: "Transactions",
    },
    {
      path: "warranty",
      label: "Warranty",
    },
  ];

  return (
    <section id="project-section" className="wpo-contact-pg-section">
      <div className="wpo-contact-form-area-transparent">
        <div className="container wpo-shop-single-section">
          <div className="row">
            <div
              className="col-12 product-info"
              style={{ marginBottom: "2rem" }}
            >
              <Tabs uriPos={4} tabs={tabs}></Tabs>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
