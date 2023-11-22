"use client";
import React, { useState } from "react";
import { Nav, NavItem } from "reactstrap";

import classnames from "classnames";

import { Link, usePathname } from "/navigation";

export default function Tabs({ uriPos, tabs }) {
  const paths = usePathname().split("/");
  const urlBuild = paths.slice(0, uriPos).join("/");

  paths[uriPos] = paths[uriPos] || "";

  const [activeTab, setActiveTab] = useState(paths[uriPos]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Nav tabs>
      {tabs.map((tab) => {
        return (
          <NavItem style={{ cursor: "pointer" }} key={tab.path}>
            <Link
              href={`${urlBuild}/${tab.path}`}
              className={classnames({
                active: activeTab === tab.path,
              })}
              onClick={() => {
                toggle(tab.path);
              }}
            >
              {tab.label}
            </Link>
          </NavItem>
        );
      })}
    </Nav>
  );
}
