"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";
import moment from "moment-timezone";
import { useTranslations } from "next-intl";

import NavButton from "/components/Shared/NavButton";
import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import { getDocumentsByProjectId } from "/services/projectDocumentServices";
import documentCategoryOptions, {
  documentCategoryOptionsEnglish,
} from "/constants/enums/projectDocumentCategory";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

export default function DocumentsPage() {
  // CONSTANTS
  const o = useTranslations("ProjectDetails_Overview");
  const t = useTranslations("ProjectDetails_Document");
  const e = useTranslations("Error");
  const searchQuery = "search";
  const pageQuery = "page";
  const categoryQuery = "itemCategory";

  const defaultPage = 1;
  const defaultPageSize = 5;
  const pageSizeQuery = "size";

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();
  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
      ? "vietnamese"
      : "";

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchDocuments = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) || "";
      const categoryEnum = searchParams.get(categoryQuery) || "";
      const page = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getDocumentsByProjectId({
          projectId,
          search,
          categoryEnum,
          page,
          pageSize,
        });
        console.log(response);
        setDocuments(response?.list ?? []);
        setCount(response?.totalPage ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(e("FetchDocumentError"));
      }
    };
    await Promise.all([fetchDocuments()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <NavButton
            url={`/project/${params.id}`}
            label={o("Overview")}
          ></NavButton>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <h3 className="my-auto">{t("Documents")}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder={t("SearchDocuments")}></Search>
        </div>
        <div className="col col-lg-6 col-12 wpo-contact-pg-section">
          {/* <form>
            <div className="wpo-contact-form-area-transparent m-0 row">
              <div className="col col-lg-6 col-12">
                <div className="form-field shadow-sm">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2"
                    style={{ backgroundColor: "white", height: "55px" }}
                  >
                    {documentCategoryOptions.map((status, index) => (
                      <option key={status} value={index}>
                        {language === "english"
                          ? documentCategoryOptionsEnglish[index]
                          : status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form> */}
        </div>
      </div>

      {loading ? (
        <Stack sx={{ height: "30rem" }}>
          <CircularProgress
            sx={{ m: "auto", color: "#CAAD06" }}
            size="3rem"
          ></CircularProgress>
        </Stack>
      ) : documents && documents.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead
            className="shadow-sm"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th scope="col" style={{ width: "12rem" }}>
                {t("Name")}
              </th>
              <th scope="col">{t("Description")}</th>
              <th scope="col">{t("Category")}</th>
              <th scope="col">{t("CreatedDate")}</th>
              <th scope="col" style={{ width: "10rem" }}></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id}>
                <td className="align-middle">{document?.name}</td>
                <td className="align-middle">{document?.description}</td>
                <td className="align-middle">
                  {language === "english"
                    ? documentCategoryOptionsEnglish[document?.category]
                    : documentCategoryOptions[document?.category]}
                </td>
                <td className="align-middle">
                  {document.createdDate
                    ? moment(document.createdDate).format("L")
                    : "Chưa xác định"}
                </td>
                <td className="align-middle m-0">{t("Download")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Stack sx={{ height: "30rem" }}>
          <p style={{ margin: "auto", textAlign: "center" }}>
            {t("NoDocument")}
          </p>
        </Stack>
      )}
      <Pagination count={count}></Pagination>
    </div>
  );
}
