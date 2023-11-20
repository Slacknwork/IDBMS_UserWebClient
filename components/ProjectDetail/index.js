import React, { useState } from "react";
import { Nav, NavItem } from "reactstrap";

import classnames from "classnames";
import Link from "next/link";

export default function ProjectDetail({ children }) {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="container wpo-shop-single-section">
      <div className="row">
        <div
          className="col-12 product-info"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <Nav tabs>
            <NavItem style={{ cursor: "pointer" }}>
              <Link
                href={"/project/1"}
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Overview
              </Link>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <Link
                href={"/project/1/tasks"}
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                Tasks
              </Link>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <Link
                href={"/project/1/comments"}
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggle("3");
                }}
              >
                Comments
              </Link>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <Link
                href={"/project/1/items"}
                className={classnames({ active: activeTab === "4" })}
                onClick={() => {
                  toggle("4");
                }}
              >
                Items
              </Link>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <Link
                href={"/project/1/documents"}
                className={classnames({ active: activeTab === "5" })}
                onClick={() => {
                  toggle("5");
                }}
              >
                Documents
              </Link>
            </NavItem>
          </Nav>
        </div>
        {children}
      </div>
    </div>
  );
}
