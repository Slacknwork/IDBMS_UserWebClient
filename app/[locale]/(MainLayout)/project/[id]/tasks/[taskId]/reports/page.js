"use client";

import { useEffect, useState } from "react";
import { Link } from "/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import moment from "moment-timezone";
import "moment/locale/vi";

import timezone from "/constants/timezone";

import { getTaskReportsByProjectTaskId } from "/services/taskReportServices";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";

export default function ItemsPage() {
  moment.tz.setDefault(timezone.momentDefault);
  moment.locale(timezone.momentLocale);
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";
  const defaultPage = 1;
  const defaultPageSize = 5;
  const pageSizeQuery = "size";

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
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchReports = async () => {
    const projectId = params.id;
    const projectTaskId = params.taskId;
    const search = searchParams.get(searchQuery) ?? "";
    const page = searchParams.get(pageQuery) ?? defaultPage;
    const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

    try {
      const response = await getTaskReportsByProjectTaskId({
        projectId,
        projectTaskId,
        search,
        page,
        pageSize,
      });
      setReports(response?.list ?? []);
      setCount(response?.totalPage ?? 0);
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

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12 mb-3">
          <h3 style={{ fontSize: 24 }}>Task Reports</h3>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder={t("SearchItems")}></Search>
        </div>
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
                  <th scope="col" width="40%">
                    {t("Name")}
                  </th>
                  <th scope="col" width="25%">
                    Created Date
                  </th>
                  <th scope="col" width="25%">
                    Units used
                  </th>
                  <th scope="col" width="10%"></th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="align-middle">{report?.name}</td>
                    <td className="align-middle">
                      {report?.createdTime
                        ? moment(report?.createdTime).format("lll")
                        : "N/A"}
                    </td>
                    <td className="align-middle">{report?.unitUsed}</td>
                    <td className="align-middle m-0">
                      <div className="d-flex">
                        <Link
                          href={`/items/${report?.interiorItem?.id}`}
                          className="theme-btn m-1"
                          style={{ width: "6rem", zIndex: 0 }}
                        >
                          {t("Details")}
                        </Link>
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
          <Pagination count={count}></Pagination>
        </div>
      </div>
    </div>
  );
}
