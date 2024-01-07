"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Chip, CircularProgress, Stack } from "@mui/material";

import languageOptions from "/constants/enums/language";
import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";

import { getProjectById } from "/services/projectServices";

import NavButton from "/components/Shared/NavButton";

export default function ProjectOverview() {
  // INIT
  const params = useParams();

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});

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
            <NavButton url={`/project`} label="Projects"></NavButton>
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
                                    Category:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.projectCategory?.name}
                                    </span>
                                  </li>
                                  <li>
                                    Language:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {languageOptions[project?.language ?? 0]}
                                    </span>
                                  </li>
                                  <li>
                                    Status:{" "}
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
                                    Created:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {new Date(
                                        project?.createdDate
                                      ).toLocaleDateString("en-GB")}
                                    </span>
                                  </li>
                                  <li>
                                    Last Updated:{" "}
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
                                    Estimated Price:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.estimatedPrice?.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      VND
                                    </span>
                                  </li>
                                  <li>
                                    Final Price:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.finalPrice?.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      VND
                                    </span>
                                  </li>
                                  <li>
                                    Total Warranty Paid:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.totalWarrantyPaid?.toLocaleString(
                                        "vi-VN"
                                      )}{" "}
                                      VND
                                    </span>
                                  </li>
                                  <li>
                                    Amount Paid:{" "}
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
                                    Total area:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.area ?? 0} m<sup>2</sup>
                                    </span>
                                  </li>
                                  <li>
                                    Estimate working days:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {project?.estimateBusinessDay ?? 0} days
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
                            Site:{" "}
                            <span>{project?.site?.name ?? "[Site Name]"}</span>
                          </li>
                          <li>
                            Address:{" "}
                            <span>
                              {project?.site?.address ?? "[Site Address]"}
                            </span>
                          </li>
                          <li>
                            Description:{" "}
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
