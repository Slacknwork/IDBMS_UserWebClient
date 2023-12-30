"use client";

import PageTitle from "/components/Shared/PageTitle";
import ProjectAdvertisementDetails from "/components/ProjectAdvertisement/Details";

export default function AdvertisementDetailsPage() {
  return (
    <div>
      <PageTitle pageTitle={"Projects"} pagesub={"Projects"} />
      <ProjectAdvertisementDetails></ProjectAdvertisementDetails>
    </div>
  );
}
