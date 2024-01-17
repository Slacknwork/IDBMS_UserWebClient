"use client";

import moment from "moment-timezone";
import { useParams } from "next/navigation";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

import Tabs from "/components/Tabs";
import NavButton from "/components/Shared/NavButton";
import { useTranslations } from "next-intl";

export default function TaskLayout({ children }) {
  const params = useParams();
  const t = useTranslations("ProjectDetails_Tab");

  const tabs = [
    {
      path: "",
      label: t("Overview"),
    },
    {
      path: "reports",
      label: t("Reports"),
    },
    {
      path: "items",
      label: t("Items"),
    },
    {
      path: "comments",
      label: t("Comments"),
    },
  ];
  return (
    <div className="wpo-project-single-area">
      <div className="container">
        <div className="row">
          <div className="col col-lg-2 col-12">
            <NavButton
              url={`/project/${params.id}/tasks`}
              label={t("Tasks")}
            ></NavButton>
            <div className="wpo-shop-single-section">
              <div className="product-info">
                <Tabs uriPos={5} tabs={tabs} vertical></Tabs>
              </div>
            </div>
          </div>
          <div className="col col-lg-10 col-12 mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
