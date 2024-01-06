"use client";

import { IoChevronBackSharp } from "react-icons/io5";
import moment from "moment-timezone";
import { Link } from "/navigation";
import { useParams } from "next/navigation";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

import Tabs from "/components/Tabs";

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
          <div className="col col-lg-12 col-12">
            <Link href={`/project/${params.id}`} className="d-flex">
              <IoChevronBackSharp
                size={25}
                color="grey"
                className="my-auto"
                style={{ marginRight: "5px" }}
              />
              <p className="my-auto" style={{ color: "grey" }}>
                Back
              </p>
            </Link>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col col-lg-2 col-12">
            <div className="wpo-shop-single-section">
              <div className="product-info">
                <Tabs uriPos={6} tabs={tabs} vertical></Tabs>
              </div>
            </div>
          </div>
          <div className="col col-lg-10 col-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
