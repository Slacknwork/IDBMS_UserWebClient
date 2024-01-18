"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Chip, CircularProgress, Stack } from "@mui/material";

import languageOptions, { languageOptionsEnglish } from "/constants/enums/language";
import projectTypeOptions from "/constants/enums/projectType";
import { projectTypeOptionsEnglish } from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import { projectStatusOptionsEnglish } from "/constants/enums/projectStatus";

import { getProjectById } from "/services/projectServices";
import { useTranslations } from "next-intl";

import NavButton from "/components/Shared/NavButton";

export default function ProjectOverview() {
  // INIT
  const params = useParams();
  const language = params?.locale === "en-US" ? "english" : params?.locale === "vi-VN" ? "vietnamese" : "";

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const t = useTranslations("ProjectDetails_Overview");
  const e = useTranslations("Error");

  const fetchProject = async () => {
    try {
      setLoading(true);
      const project = await getProjectById(params.id);
      setProject(project);
    } catch (error) {
      toast.error(e("ProjectsError"));
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
            <NavButton url={`/project`} label={t("Projects")}></NavButton>
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
                        <h3 style={{ fontWeight: 800 }}>
                          {project?.name ?? "[Project Name]"}{" "}
                        </h3>
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
                          label={
                            (() => {
                              if (language === "english") {
                                return projectTypeOptionsEnglish[
                                  project?.type
                                ]
                                  ;
                              } else if (language === "vietnamese") {
                                return projectTypeOptions[
                                  project?.type
                                ]
                              } else {
                                return '';
                              }
                            })()
                          }
                        ></Chip>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="wpo-project-single-item list-widget">
                        <p>{project?.description ?? ""}</p>
                        <div className="row">
                          <div className="col-lg-12 mb-4">
                            <div className="row gx-5">
                              <div className="col-lg-6">
                                <ul>
                                  <li>
                                    {t("Category")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {
                                        (() => {
                                          if (language === "english") {
                                            return project?.projectCategory?.englishName;
                                          } else if (language === "vietnamese") {
                                            return project?.projectCategory?.name;
                                          }
                                        })()
                                      }
                                    </span>
                                  </li>
                                  <li>
                                    {t("Language")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {
                                        (() => {
                                          if (language === "english") {
                                            return languageOptionsEnglish[project?.language ?? 0];
                                          } else if (language === "vietnamese") {
                                            return languageOptions[project?.language ?? 0];
                                          }
                                        })()
                                      }
                                    </span>
                                  </li>
                                  <li>
                                    {t("Status")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {
                                        (() => {
                                          if (language === "english") {
                                            return projectStatusOptionsEnglish[
                                              project?.status ?? 0
                                            ]
                                              ;
                                          } else if (language === "vietnamese") {
                                            return projectStatusOptions[
                                              project?.status ?? 0
                                            ]
                                          } else {
                                            return '';
                                          }
                                        })()
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
                                        project?.updatedDate
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
                                    {t("VAT") + " (10%)"}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {(project?.finalPrice * 0.1 ?? 0).toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      VND
                                    </span>
                                  </li>
                                  <li>
                                    {t("TotalIncludeVAT")}:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {(project?.finalPrice * 0.1 + project?.finalPrice ?? 0).toLocaleString(
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
                            <span>{project?.site?.name ?? "N/A"}</span>
                          </li>
                          <li>
                            {t("Address")}:{" "}
                            <span>
                              {project?.site?.address ?? "N/A"}
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
