"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import moment from "moment-timezone";
import "moment/locale/vi";

import timezone from "/constants/timezone";

import { getTaskReportById } from "/services/taskReportServices";
import { downloadFileByUrl } from "/services/downloadServices";

import NavButton from "/components/Shared/NavButton";

export default function ItemsPage() {
  moment.tz.setDefault(timezone.momentDefault);
  moment.locale(timezone.momentLocale);

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();
  const t = useTranslations("ProjectDetails_Item");
  const e = useTranslations("Error");
  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
      ? "vietnamese"
      : "";

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  // FETCH DATA
  const fetchReports = async () => {
    const projectId = params.id;
    const taskReportId = params.reportId;

    try {
      const response = await getTaskReportById(taskReportId, projectId);
      setReports(response?.taskDocuments ?? []);
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    }
  };
  const fetchDataFromApi = async () => {
    setLoading(true);
    await Promise.all([fetchReports()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const onDownload = async (document) => {
    try {
      toast.loading(`Đang tải ${document.name}...`);
      await downloadFileByUrl({
        imageUrl: document.document,
        name: document.name,
      });
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error("Lỗi tải file!");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <NavButton
            url={`/project/${params.id}/tasks/${params.taskId}/reports`}
          ></NavButton>
        </div>
        <div className="col col-lg-12 col-12 mb-3">
          <h3 style={{ fontSize: 24 }}>Report Details</h3>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-12 col-12" style={{ height: "30rem" }}>
          {loading ? (
            <Stack sx={{ height: "30rem" }}>
              <CircularProgress
                sx={{ m: "auto", color: "#CAAD06" }}
                size="3rem"
              ></CircularProgress>
            </Stack>
          ) : reports && reports.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead
                className="shadow-sm"
                style={{ position: "sticky", top: 0, zIndex: 1 }}
              >
                <tr>
                  <th scope="col" width="80%">
                    {t("Name")}
                  </th>
                  <th scope="col" width="20%"></th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="align-middle">{report?.name}</td>
                    <td className="align-middle m-0 d-flex justify-content-end">
                      <div className="d-flex">
                        <button
                          className="theme-btn m-1 px-2 py-2"
                          style={{ zIndex: 0 }}
                          onClick={() => onDownload(report)}
                        >
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Stack sx={{ height: "30rem" }}>
              <p style={{ margin: "auto", textAlign: "center" }}>No data.</p>
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
}
