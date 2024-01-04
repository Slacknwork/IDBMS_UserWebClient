"use client";

import Tabs from "/components/Tabs";

export default function ProjectDetail({ children }) {
  const tabs = [
    {
      path: "",
      label: "Overview",
    },
    {
      path: "floors",
      label: "Floors",
    },
    {
      path: "tasks",
      label: "Tasks",
    },
    {
      path: "comments",
      label: "Comments",
    },
    {
      path: "items",
      label: "Items",
    },
    {
      path: "documents",
      label: "Documents",
    },
    {
      path: "payment",
      label: "Payment",
    },
  ];

  return (
    <section id="project-section" className="mt-4">
      <div className="wpo-contact-form-area-transparent">
        <div className="container wpo-shop-single-section">
          <div className="row">
            <div className="col-12 product-info p-0">
              <Tabs uriPos={3} tabs={tabs}></Tabs>
            </div>
            <div
              className="shadow-lg py-4 mb-4"
              style={{ backgroundColor: "white", minHeight: "30rem" }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
