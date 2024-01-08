"use client";

import { useEffect, useState } from "react";
import { Link } from "/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";


import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import { getWarrantyClaimsByProjectId } from "/services/warrantyClaimServices";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

const isCompanyCoverOptions = ["Khách hàng", "Công ty"];
const isCompanyCoverEnglishOptions = ["Customer", "Company"];

export default function WarrantiesPage() {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";

  const defaultPage = 1;
  const defaultPageSize = 5;
  const pageSizeQuery = "size";
  const isCompanyCoverQuery = "isCompanyCover";

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();
  const language = params?.locale === "en-US" ? "english" : params?.locale === "vi-VN" ? "vietnamese" : "";

  // WARRANTY CLAIMS
  const [warrantyClaims, setWarrantyClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchWarrantyClaims = async () => {
      const projectId = params.id;
      const name = searchParams.get(searchQuery) || "";
      const isCompanyCover =
        searchParams.get(isCompanyCoverQuery) === "1"
          ? true
          : searchParams.get(isCompanyCoverQuery) === null
            ? ""
            : false;
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getWarrantyClaimsByProjectId({
          projectId,
          isCompanyCover,
          name,
          pageSize,
          pageNo,
        });
        console.log(response);

        setWarrantyClaims(response?.list ?? []);
        setCount(response?.totalPage ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thanh Toán' từ hệ thống");
      }
    };
    await Promise.all([fetchWarrantyClaims()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  return (
    <div
      style={{
        minHeight: "35rem",
      }}
    >
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder="Search by name..."></Search>
        </div>
        <div className="col col-lg-6 col-12 wpo-contact-pg-section">
          <form>
            <div className="wpo-contact-form-area-transparent m-0 row">
              <div className="col col-lg-6 col-12">
                <div className="form-field shadow-sm">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2"
                    style={{ backgroundColor: "white", height: "55px" }}
                  >
                    {/* is company cover*/}
                    {
                      language === 'english'
                        ? isCompanyCoverEnglishOptions.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))
                        : isCompanyCoverOptions.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))
                    }
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <Stack sx={{ height: "30rem" }}>
          <CircularProgress
            sx={{ m: "auto", color: "#CAAD06" }}
            size="3rem"
          ></CircularProgress>
        </Stack>
      ) : (
        <table className="table table-striped table-hover">
          <thead
            className="shadow-sm"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th scope="col">
                Name
              </th>
              <th scope="col">Amount (VND)</th>
              <th scope="col">Cover By</th>
              <th scope="col">Created Date</th>
              <th scope="col">End Date</th>
              <th scope="col" style={{ width: "10rem" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {warrantyClaims &&
              warrantyClaims.map((claim) => (
                <tr key={claim.id}>
                  <td className="align-middle">
                    {claim?.name}
                  </td>
                  <td className="align-middle">
                    {claim?.totalPaid.toLocaleString("en-US")}
                  </td>
                  <td className="align-middle">
                    {language === "english"
                      ? (claim?.isCompanyCover ? isCompanyCoverEnglishOptions[1] : isCompanyCoverEnglishOptions[0])
                      : (claim?.isCompanyCover ? isCompanyCoverOptions[1] : isCompanyCoverOptions[0])
                    }
                  </td>
                  <td className="align-middle">
                    {claim?.createdDate
                      ? moment(claim?.createdDate).format("L")
                      : "-"}
                  </td>
                  <td className="align-middle">
                    {claim?.endDate
                      ? moment(claim?.endDate).format("L")
                      : "-"}
                  </td>
                  <td className="align-middle m-0">
                    Tải hóa đơn
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Pagination count={count}></Pagination>
    </div>
  );
}
