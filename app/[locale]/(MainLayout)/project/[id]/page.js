"use client";

import { Link } from "/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Chip, CircularProgress, Stack } from "@mui/material";

import languageOptions from "/constants/enums/language";
import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";

import { getProjectById } from "/services/projectServices";
import { useTranslations } from "next-intl";

export default function ProjectOverview() {
  // INIT
  const params = useParams();

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const t = useTranslations("ProjectDetails_Overview");

  const fetchProject = async () => {
    try {
      setLoading(true);
      const project = await getProjectById(params.id);
      setProject(project);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Dự án!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchProject()]);
  }, []);

  return (
    <div className="wpo-project-single-area">
      <div className="container" style={{ minHeight: "35rem" }}>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="wpo-breadcumb-wrap">
              <ol>
                <li>
                  <Link href={`/project/${params.id}`}> {t("Overview")}</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
        {loading ? (
          <Stack sx={{ minHeight: "35rem" }}>
            <CircularProgress
              sx={{ m: "auto", color: "#CAAD06" }}
              size="4rem"
            ></CircularProgress>
          </Stack>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-12 col-12">
              <div className="wpo-project-single-wrap">
                <div className="wpo-project-single-item">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="wpo-project-single-title d-flex">
                        <h3>{project?.name ?? "[Project Name]"} </h3>
                        <Chip
                          sx={{
                            mx: 2,
                            mt: "4px",
                            backgroundColor: "#CAAD06",
                            color: "white",
                            fontWeight: 600,
                            "& .MuiChip-label": {
                              pt: "1px",
                              fontSize: 16,
                            },
                          }}
                          label={`${projectTypeOptions[project?.type]}`}
                        ></Chip>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="wpo-project-single-item list-widget">
                        <p>{project?.description ?? "[Project Description]"}</p>
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <div className="row gx-5">
                              <div className="col-lg-6">
                                <ul>
                                  <li>
                                  {t("Category")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.projectCategory?.name}
                                    </span>
                                  </li>
                                  <li>
                                  {t("Language")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {languageOptions[project?.language ?? 0]}
                                    </span>
                                  </li>
                                  <li>
                                  {t("Status")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {
                                        projectStatusOptions[
                                          project?.status ?? 0
                                        ]
                                      }
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-6">
                                <ul>
                                  <li>
                                  {t("Created")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {new Date(
                                        project?.createdDate
                                      ).toLocaleDateString("en-GB")}
                                    </span>
                                  </li>
                                  <li>
                                  {t("LastUpdated")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {new Date(
                                        project?.createdDate
                                      ).toLocaleDateString("en-GB")}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="row gx-5">
                              <div className="col-lg-6">
                                <ul>
                                  <li>
                                  {t("EstimatedPrice")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.estimatedPrice?.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      VND
                                    </span>
                                  </li>
                                  <li>
                                  {t("FinalPrice")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.finalPrice?.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      VND
                                    </span>
                                  </li>
                                  <li>
                                  {t("TotalWarrantyPaid")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.totalWarrantyPaid?.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      VND
                                    </span>
                                  </li>
                                  <li>
                                  {t("AmountPaid")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.amountPaid?.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      VND
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-6">
                                <ul>
                                  <li>
                                  {t("TotalArea")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.area ?? 0} m<sup>2</sup>
                                    </span>
                                  </li>
                                  <li>
                                  {t("EstimateWorkingDays")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.estimateBusinessDay ?? 0} {t("Days")}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div
                        className="wpo-project-single-content-des-right"
                        style={{ marginTop: "3rem" }}
                      >
                        <ul>
                          <li>
                          {t("Site")}:{" "}
                            <span>{project?.site?.name ?? "[Site Name]"}</span>
                          </li>
                          <li>
                          {t("Address")}:{" "}
                            <span>
                              {project?.site?.address ?? "[Site Address]"}
                            </span>
                          </li>
                          <li>
                          {t("Description")}:{" "}
                            <span>{project?.site?.description ?? "N/A"}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
