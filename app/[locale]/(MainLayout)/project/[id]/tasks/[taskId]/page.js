"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  CircularProgress,
  LinearProgress,
  linearProgressClasses,
  Stack,
} from "@mui/material";
import moment from "moment-timezone";
import { styled } from "@mui/material/styles";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

import projectTaskStatusOptions, {projectTaskStatusOptionsEnglish} from "/constants/enums/projectTaskStatus";
import calculationUnitOptions from "/constants/enums/calculationUnit";

import { getProjectTaskById } from "/services/projectTaskServices";
import { useTranslations } from "next-intl";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#f6e166",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: "#caad06",
  },
}));

export default function TaskLayout({ children }) {
  // INIT
  const params = useParams();
  const t = useTranslations("ProjectDetails_Overview");
  const e = useTranslations("Error");
  const language = params?.locale === "en-US" ? "english" : params?.locale === "vi-VN" ? "vietnamese" : "";

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});

  const fetchTask = async () => {
    try {
      const task = await getProjectTaskById(params.taskId, params.id);
      setTask(task);
    } catch (error) {
      toast.error(e("TasksError"));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchTask()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wpo-project-single-area">
      <div className="container">
        {loading ? (
          <Stack sx={{ minHeight: "35rem" }}>
            <CircularProgress
              sx={{ m: "auto", color: "#CAAD06" }}
              size="4rem"
            ></CircularProgress>
          </Stack>
        ) : (
          <div className="wpo-project-single-wrap">
            <div className="wpo-project-single-item">
              <div className="row">
                <div className="col col-lg-6 col-12">
                  <h6 style={{ color: "grey" }}>
                    {task?.code ?? "[Task Code]"}
                  </h6>
                  <h3 style={{ fontWeight: 700 }}>
                    {task?.name ?? "[Task Name]"}
                  </h3>
                </div>
                <div className="col col-lg-2 col-4 wpo-project-single-item list-widget">
                  <ul>
                    <li>{t("Progress")}:</li>
                  </ul>
                </div>
                <div className="col col-lg-4 col-8 position-relative">
                  <BorderLinearProgress
                    variant="determinate"
                    value={task?.percentage}
                  ></BorderLinearProgress>
                  <p
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translate(-50%, -100%)",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    {task.percentage}%
                  </p>
                </div>
                <div className="col-lg-8">
                  <div className="wpo-project-single-item list-widget">
                    <div className="row">
                      <div className="col col-lg-12 col-12">
                        <p>{task?.description ?? ""}</p>
                      </div>
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
                                    return task?.taskCategory?.englishName;
                                  } else if (language === "vietnamese") {
                                    return task?.taskCategory?.name;
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
                                    return projectTaskStatusOptionsEnglish[task?.status ?? 0];
                                  } else if (language === "vietnamese") {
                                    return projectTaskStatusOptions[task?.status ?? 0];
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
                                    task?.createdDate
                                  ).toLocaleDateString("en-GB")}
                                </span>
                              </li>
                              <li>
                              {t("LastUpdated")}:{" "}
                                <span style={{ fontWeight: 1000 }}>
                                  {new Date(
                                    task?.createdDate
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
                              {t("ContractedUnits")}:{" "}
                                <span style={{ fontWeight: 1000 }}>
                                  {task?.unitInContract}{" "}
                                  {
                                    calculationUnitOptions[
                                      task?.calculationUnit
                                    ]
                                  }
                                </span>
                              </li>
                              <li>
                              {t("UsedUnits")}:{" "}
                                <span style={{ fontWeight: 1000 }}>
                                  {task?.unitUsed}{" "}
                                  {
                                    calculationUnitOptions[
                                      task?.calculationUnit
                                    ]
                                  }
                                </span>
                              </li>
                              <li>
                              {t("TotalWarrantyPaid")}:{" "}
                                <span style={{ fontWeight: 1000 }}>
                                  {task?.totalWarrantyPaid
                                    ? `${task?.totalWarrantyPaid?.toLocaleString(
                                        "vi-VN"
                                      )} VND`
                                    : "N/A"}
                                </span>
                              </li>
                              <li>
                              {t("AmountPaid")}:{" "}
                                <span style={{ fontWeight: 1000 }}>
                                  {task?.amountPaid
                                    ? `${task?.amountPaid?.toLocaleString(
                                        "vi-VN"
                                      )} VND`
                                    : "N/A"}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-6">
                            <ul>
                              <li>
                              {t("Started")}:{" "}
                                <span style={{ fontWeight: 1000 }}>
                                  {task?.startedDate
                                    ? moment(task.createdDate).format("L")
                                    : "N/A"}
                                </span>
                              </li>
                              {task?.startedDate && (
                                <li>
                                  {task.endDate ? (
                                    <>
                                      {t("Ended")}:{" "}
                                      <span style={{ fontWeight: 1000 }}>
                                        {moment(task.endDate).format("L")}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      {t("EstimatedDays")}:{" "}
                                      <span style={{ fontWeight: 1000 }}>
                                        {task.estimatedBusinessDay} {t("Days")}
                                      </span>
                                    </>
                                  )}
                                </li>
                              )}
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
                      {t("Site")}: <span>{task?.site?.name ?? "N/A"}</span>
                      </li>
                      <li>
                      {t("Address")}:{" "}
                        <span>{task?.site?.address ?? "N/A"}</span>
                      </li>
                      <li>
                      {t("Description")}:{" "}
                        <span>{task?.site?.description ?? "N/A"}</span>
                      </li>
                    </ul>
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
