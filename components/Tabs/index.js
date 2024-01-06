"use client";

import React, { useState, useEffect } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

import classnames from "classnames";

import { usePathname, useRouter } from "/navigation";

export default function Tabs({ uriPos, tabs, vertical }) {
  const router = useRouter();
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
    <Nav tabs vertical={vertical}>
      {tabs.map((tab) => {
        return (
          <NavItem style={{ cursor: "pointer" }} key={tab.path}>
            <NavLink
              className={classnames({
                active: activeTab === tab.path,
              })}
              onClick={() => {
                router.push(`${urlBuild}/${tab.path}`);
              }}
            >
              <h5
                style={{
                  color: "black",
                  fontWeight: 500,
                }}
              >
                {tab.label}
              </h5>
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
}
