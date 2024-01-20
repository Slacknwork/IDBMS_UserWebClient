"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import moment from "moment-timezone";

import { getTransactionsByProjectId } from "/services/transactionServices";

import transactionStatus, {
  transactionStatusOptionsEnglish,
} from "/constants/enums/transactionStatus";
import transactionType, {
  transactionTypeOptionsEnglish,
} from "/constants/enums/transactionType";
import timezone from "/constants/timezone";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import NavButton from "/components/Shared/NavButton";

moment.tz.setDefault(timezone.momentDefault);

export default function TransactionsPage() {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";

  const defaultPage = 1;
  const defaultPageSize = 5;
  const pageSizeQuery = "size";
  const typeQuery = "type";
  const statusQuery = "status";

  // INIT
  const o = useTranslations("ProjectDetails_Overview");
  const t = useTranslations("ProjectDetails_Transaction");
  const e = useTranslations("Error");
  const params = useParams();
  const searchParams = useSearchParams();
  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
      ? "vietnamese"
      : "";

  // TRANSACTIONS
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    setLoading(true);
    const fetchTransactions = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) ?? "";
      const type = searchParams.get(typeQuery) ?? "";
      const status = searchParams.get(statusQuery) ?? "";
      const pageNo = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;
      try {
        const response = await getTransactionsByProjectId({
          projectId,
          search,
          type,
          status,
          pageSize,
          pageNo,
        });
        setTransactions(response?.list ?? []);
        setCount(response?.totalPage ?? 0);
      } catch (error) {
        toast.error(e("FetchTransactionError"));
      }
    };
    await Promise.all([fetchTransactions()]);
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
          <h3 className="my-auto">{t("Transactions")}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder={t("SearchPayerName")}></Search>
        </div>
        {/* <div className="col col-lg-6 col-12 wpo-contact-pg-section">
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
                    {transactionType.map((status, index) => (
                      <option key={status} value={index}>
                        {language === "english"
                          ? transactionTypeOptionsEnglish[index]
                          : status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col col-lg-6 col-12">
                <div className="form-field shadow-sm">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2"
                    style={{ backgroundColor: "white", height: "55px" }}
                  >
                    {transactionStatus.map((status, index) => (
                      <option key={status} value={index}>
                        {language === "english"
                          ? transactionStatusOptionsEnglish[index]
                          : status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div> */}
      </div>

      {loading ? (
        <Stack sx={{ height: "30rem" }}>
          <CircularProgress
            sx={{ m: "auto", color: "#CAAD06" }}
            size="3rem"
          ></CircularProgress>
        </Stack>
      ) : transactions && transactions.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead
            className="shadow-sm"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th scope="col">{t("Type")}</th>
              <th scope="col">{t("Amount")} (VND)</th>
              <th scope="col">{t("CreatedDate")}</th>
              <th scope="col">{t("PayerName")}</th>
              <th scope="col">{t("Status")}</th>
              <th scope="col" style={{ width: "10rem" }}></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="align-middle">{transaction?.type}</td>
                <td className="align-middle">
                  {transaction?.amount?.toLocaleString("en-US")}
                </td>
                <td className="align-middle">
                  {transaction.createdDate
                    ? moment(transaction.createdDate).format("L")
                    : "-"}
                </td>
                <td className="align-middle">{transaction?.payerName}</td>
                <td className="align-middle">
                  {language === "english"
                    ? transactionStatusOptionsEnglish[transaction?.status]
                    : transactionStatus[transaction?.status]}
                </td>
                <td className="align-middle m-0">{t("DownloadInvoice")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Stack sx={{ height: "30rem" }}>
          <p style={{ margin: "auto", textAlign: "center" }}>
            {t("NoTransaction")}
          </p>
        </Stack>
      )}
      <Pagination count={count}></Pagination>
    </div>
  );
}
