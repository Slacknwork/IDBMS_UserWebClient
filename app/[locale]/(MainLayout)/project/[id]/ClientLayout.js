"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "/navigation";

import PageTitle from "/components/PageTitle";
import Tabs from "/components/Tabs";



export default function ClientLayout({ children }) {
  const router = useRouter();
  const t = useTranslations("ProjectDetails_Overview");
  const tab = useTranslations("ProjectDetails_Tab");

  const tabs = [
    {
      path: "",
      label: tab("Overview"),
    },
    {
      path: "floors",
      label: tab("Floors"),
    },
    {
      path: "stages",
      label: tab("Stages"),
    },
    {
      path: "tasks",
      label: tab("Tasks"),
    },
    {
      path: "comments",
      label: tab("Comments"),
    },
    {
      path: "items",
      label: tab("Items"),
    },
    {
      path: "documents",
      label: tab("Documents"),
    },
    {
      path: "payment",
      label: tab("Payment"),
    },
  ];
  
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <PageTitle pageTitle={t("Details")} pagesub={"Project"} />
      <section id="project-section" className="mt-4">
        <div className="container wpo-shop-single-section">
          <div className="row">
            <div className="col-12 product-info p-0">
              <Tabs uriPos={3} tabs={tabs}></Tabs>
            </div>
            <div
              className="shadow-lg py-3 mb-4"
              style={{ backgroundColor: "white", minHeight: "30rem" }}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
