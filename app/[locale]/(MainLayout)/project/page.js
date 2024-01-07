"use client";

import { useSelector } from "react-redux";

import PageTitle from "/components/PageTitle";
import ProjectList from "/components/ProjectList";
import ProjectAdvertisement from "/components/ProjectAdvertisement";
import { useTranslations } from "next-intl";

export default function ProjectPage() {
  const user = useSelector((state) => state.customer);
  const t = useTranslations("Header");

  return (
    <div>
      {!user || !user.loggedIn ? (
        <div>
          <PageTitle pageTitle={t("Projects")} pagesub={t("Projects")} />
          <ProjectAdvertisement></ProjectAdvertisement>
        </div>
      ) : (
        <div>
          <PageTitle pageTitle={t("Projects")} pagesub={t("Projects")} />
          <ProjectList></ProjectList>
        </div>
      )}
    </div>
  );
}
