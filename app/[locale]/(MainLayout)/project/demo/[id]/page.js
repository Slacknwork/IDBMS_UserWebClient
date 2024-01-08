"use client";

import PageTitle from "/components/Shared/PageTitle";
import ProjectAdvertisementDetails from "/components/ProjectAdvertisement/Details";
import { useTranslations } from "next-intl";

export default function AdvertisementDetailsPage() {
  const h = useTranslations("Header");

  return (
    <div>
      <PageTitle pageTitle={h("Projects")} pagesub={h("Projects")} />
      <ProjectAdvertisementDetails></ProjectAdvertisementDetails>
    </div>
  );
}
