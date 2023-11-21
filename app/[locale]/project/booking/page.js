"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import ProjectTypeSelect from "/components/ProjectTypeSelect";

import { useTranslations } from "next-intl";

const ProjectBookingPage = () => {
  const t = useTranslations("Project");

  return (
    <Fragment>
      <PageTitle pageTitle={t("Booking")} pagesub={"Project Booking"} />
      <ProjectTypeSelect />
    </Fragment>
  );
};

export default ProjectBookingPage;
