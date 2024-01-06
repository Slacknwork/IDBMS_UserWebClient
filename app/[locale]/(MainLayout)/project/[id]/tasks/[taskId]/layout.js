"use client";

import { Link } from "/navigation";
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

import projectTaskStatusOptions from "/constants/enums/projectTaskStatus";
import calculationUnitOptions from "/constants/enums/calculationUnit";

import { getProjectTaskById } from "/services/projectTaskServices";

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

export default function TaskOverviewPage() {
  // INIT
  const params = useParams();

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});

  const fetchTask = async () => {
    try {
      const task = await getProjectTaskById(params.taskId, params.id);
      setTask(task);
    } catch (error) {
      toast.error("Error: Task!");
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
      <div className="container" style={{ minHeight: "35rem" }}>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="wpo-breadcumb-wrap">
              <ol>
                <li>
                  <Link href={`/project/${params.id}/tasks`}>{`Tasks`}</Link>
                </li>
                {!loading && (
                  <li>
                    <Link href={`/project/${params.id}/tasks/${task?.id}`}>
                      {task?.name ?? `Task`}
                    </Link>
                  </li>
                )}
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
            <div className="col col-lg-12 col-12 mb-4">
              <h5 style={{ color: "grey", fontWeight: 400 }}>
                {task?.code ?? "[Task Name]"}
              </h5>
              <div className="row">
                <div className="col col-lg-6 col-12">
                  <h3 className="my-auto">{task?.name ?? "[Task Name]"}</h3>
                </div>
                <div className="col col-lg-6 col-12 wpo-project-single-wrap">
                  <div className="wpo-project-single-item mb-0 list-widget">
                    <div className="row gx-5">
                      <div className="col-lg-2">
                        <ul className=" my-auto">
                          <li>Progress:</li>
                        </ul>
                      </div>
                      <div className="col-lg-8 offset-1 position-relative">
                        <BorderLinearProgress
                          sx={{ mt: "0.25em" }}
                          variant="determinate"
                          value={task?.percentage}
                        ></BorderLinearProgress>
                        <p
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontWeight: 600,
                            color: "white",
                          }}
                        >
                          {task?.percentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-12">
              <div className="wpo-project-single-wrap">
                <div className="wpo-project-single-item">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="wpo-project-single-item list-widget">
                        <div className="row">
                          <div className="col col-lg-12 col-12">
                            <p>{task?.description ?? "[task Description]"}</p>
                          </div>
                          <div className="col-lg-12 mb-4">
                            <div className="row gx-5">
                              <div className="col-lg-6">
                                <ul>
                                  <li>
                                    Category:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {task?.taskCategory?.name}
                                    </span>
                                  </li>
                                  <li>
                                    Status:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {
                                        projectTaskStatusOptions[
                                          task?.status ?? 0
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
                                        task?.createdDate
                                      ).toLocaleDateString("en-GB")}
                                    </span>
                                  </li>
                                  <li>
                                    Last Updated:{" "}
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
                                    Contracted units:{" "}
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
                                    Used units:{" "}
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
                                    Total Warranty Paid:{" "}
                                    <span style={{ fontWeight: 1000 }}>
                                      {task?.totalWarrantyPaid
                                        ? `${task?.totalWarrantyPaid?.toLocaleString(
                                            "vi-VN"
                                          )} VND`
                                        : "N/A"}
                                    </span>
                                  </li>
                                  <li>
                                    Amount Paid:{" "}
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
                                    Started:{" "}
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
                                          Ended:{" "}
                                          <span style={{ fontWeight: 1000 }}>
                                            {moment(task.endDate).format("L")}
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          Estimated days:{" "}
                                          <span style={{ fontWeight: 1000 }}>
                                            {task.estimatedBusinessDay} days
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
                            Site:{" "}
                            <span>{task?.site?.name ?? "[Site Name]"}</span>
                          </li>
                          <li>
                            Address:{" "}
                            <span>
                              {task?.site?.address ?? "[Site Address]"}
                            </span>
                          </li>
                          <li>
                            Description:{" "}
                            <span>{task?.site?.description ?? "N/A"}</span>
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
