"use client";

import React, { useState } from "react";
import { Nav, NavItem } from "reactstrap";

import classnames from "classnames";
import { Link } from "/navigation";

export default function ProjectDetail({ children }) {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <section id="project-section" className="wpo-contact-pg-section">
      <div className="wpo-contact-form-area-transparent">
        <div className="container wpo-shop-single-section">
          <div className="row">
            <div
              className="col-12 product-info"
              style={{ marginBottom: "2rem" }}
            >
              <Nav tabs>
                <NavItem style={{ cursor: "pointer" }}>
                  <Link
                    href={"/project/1/payment"}
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Stages
                  </Link>
                </NavItem>
                <NavItem style={{ cursor: "pointer" }}>
                  <Link
                    href={"/project/1/payment/transactions"}
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Transactions
                  </Link>
                </NavItem>
                <NavItem style={{ cursor: "pointer" }}>
                  <Link
                    href={"/project/1/payment/warranty"}
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    Warranty
                  </Link>
                </NavItem>
              </Nav>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
