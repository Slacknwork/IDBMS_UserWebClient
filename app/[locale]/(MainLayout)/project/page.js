"use client";

import { useSelector } from "react-redux";

import PageTitle from "/components/PageTitle";
import ProjectList from "/components/ProjectList";
import ProjectAdvertisement from "/components/ProjectAdvertisement";

export default function ProjectPage() {
  const user = useSelector((state) => state.customer);

  return (
    <div>
      {!user || !user.loggedIn ? (
        <div>
          <PageTitle pageTitle={"Projects"} pagesub={"Projects"} />
          <ProjectAdvertisement></ProjectAdvertisement>
        </div>
      ) : (
        <div>
          <PageTitle pageTitle={"Projects"} pagesub={"Projects"} />
          <ProjectList></ProjectList>
        </div>
      )}
    </div>
  );
}
