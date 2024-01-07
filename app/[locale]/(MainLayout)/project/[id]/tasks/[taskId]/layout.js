"use client";

import moment from "moment-timezone";
import { useParams } from "next/navigation";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

import Tabs from "/components/Tabs";
import NavButton from "/components/Shared/NavButton";

const tabs = [
  {
    path: "",
    label: "Overview",
  },
  {
    path: "items",
    label: "Items",
  },
  {
    path: "comments",
    label: "Comments",
  },
];

export default function TaskLayout({ children }) {
  const params = useParams();

  return (
    <div className="wpo-project-single-area">
      <div className="container">
        <div className="row">
          <div className="col col-lg-2 col-12">
            <NavButton
              url={`/project/${params.id}/tasks`}
              label="Tasks"
            ></NavButton>
            <div className="wpo-shop-single-section">
              <div className="product-info">
                <Tabs uriPos={6} tabs={tabs} vertical></Tabs>
              </div>
            </div>
          </div>
          <div className="col col-lg-10 col-12 mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
