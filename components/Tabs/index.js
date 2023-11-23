"use client";

import React, { useState, useEffect } from "react";
import { Nav, NavItem } from "reactstrap";

import classnames from "classnames";

import { Link, usePathname } from "/navigation";

export default function Tabs({ uriPos, tabs }) {
  const paths = usePathname().split("/");
  const urlBuild = paths.slice(0, uriPos).join("/");

  paths[uriPos] = paths[uriPos] || "";

  const [activeTab, setActiveTab] = useState(paths[uriPos]);

  useEffect(() => {
    const item = tabs.find((p) => {
      return paths[uriPos] === p.path;
    })?.path;
    setActiveTab(item || "");
  }, [paths]);

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
            >
              {tab.label}
            </Link>
          </NavItem>
        );
      })}
    </Nav>
  );
}
