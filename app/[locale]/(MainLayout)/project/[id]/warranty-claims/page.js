"use client";

import { useEffect, useState } from "react";
import { Link } from "/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";
import { useTranslations } from "next-intl";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import NavButton from "/components/Shared/NavButton";
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
  const o = useTranslations("ProjectDetails_Overview");
  const t = useTranslations("ProjectDetails_Warranty");
  const e = useTranslations("Error");
  const params = useParams();
  const searchParams = useSearchParams();
  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
      ? "vietnamese"
      : "";

  // WARRANTY CLAIMS
  const [warrantyClaims, setWarrantyClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    setLoading(true);
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
        toast.error(e("FetchWarrantyError"));
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
      className="container"
      style={{
        minHeight: "35rem",
      }}
    >
      <div className="row">
        <div className="col col-lg-12 col-12">
          <NavButton
            url={`/project/${params.id}`}
            label={o("Overview")}
          ></NavButton>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <h3 className="my-auto">{t("WarrantyClaims")}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder={t("SearchName")}></Search>
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
                    {language === "english"
                      ? isCompanyCoverEnglishOptions.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))
                      : isCompanyCoverOptions.map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
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
      ) : warrantyClaims && warrantyClaims.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead
            className="shadow-sm"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th scope="col">{t("Name")}</th>
              <th scope="col">{t("Amount")} (VND)</th>
              <th scope="col">{t("CoverBy")}</th>
              <th scope="col">{t("CreatedDate")}</th>
              <th scope="col">{t("EndDate")}</th>
              <th scope="col" style={{ width: "10rem" }}>
              </th>
            </tr>
          </thead>
          <tbody>
            {warrantyClaims.map((claim) => (
              <tr key={claim.id}>
                <td className="align-middle">{claim?.name}</td>
                <td className="align-middle">
                  {claim?.totalPaid.toLocaleString("en-US")}
                </td>
                <td className="align-middle">
                  {language === "english"
                    ? claim?.isCompanyCover
                      ? isCompanyCoverEnglishOptions[1]
                      : isCompanyCoverEnglishOptions[0]
                    : claim?.isCompanyCover
                    ? isCompanyCoverOptions[1]
                    : isCompanyCoverOptions[0]}
                </td>
                <td className="align-middle">
                  {claim?.createdDate
                    ? moment(claim?.createdDate).format("L")
                    : "-"}
                </td>
                <td className="align-middle">
                  {claim?.endDate ? moment(claim?.endDate).format("L") : "-"}
                </td>
                <td className="align-middle m-0">{t("Download")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Stack sx={{ height: "30rem" }}>
          <p style={{ margin: "auto", textAlign: "center" }}>{t("NoWarranty")}</p>
        </Stack>
      )}
      <Pagination count={count}></Pagination>
    </div>
  );
}
