"use client";

import { useEffect, useState } from "react";
import { Link } from "/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";
import Image from "next/image";

import { getItemInTasksByProjectId } from "/services/itemInTaskServices";
import { getAllInteriorItemCategories } from "/services/interiorItemCategoryServices";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import { getTransactionsByProjectId } from "/services/transactionServices";
import transactionStatus from "/constants/enums/transactionStatus";
import transactionType from "/constants/enums/transactionType";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

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
  const params = useParams();
  const searchParams = useSearchParams();
  const language = params?.locale === "en-US" ? "english" : params?.locale === "vi-VN" ? "vietnamese" : "";

  // TRANSACTIONS
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchTransactions = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) || "";
      const type = searchParams.get(typeQuery) || "";
      const status = searchParams.get(statusQuery) || "";
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getTransactionsByProjectId({
          projectId,
          search,
          type,
          status,
          pageSize,
          pageNo,
        });
        console.log(response);

        setTransactions(response?.list ?? []);
        setCount(response?.totalPage ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thanh Toán' từ hệ thống");
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
      style={{
        minHeight: "35rem",
      }}
    >
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder="Search by payer name..."></Search>
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
                    {/* type*/}
                    {transactionType.map((value, index) => (
                      <option value={value} key={index}>
                        {value}
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
                    {/* status */}
                    {transactionStatus.map((value, index) => (
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
      ) : (
        <table className="table table-striped table-hover">
          <thead
            className="shadow-sm"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th scope="col">
                Type
              </th>
              <th scope="col">Amount (VND)</th>
              <th scope="col">Created Date</th>
              <th scope="col">Payer Name</th>
              <th scope="col">Status</th>
              <th scope="col" style={{ width: "10rem" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="align-middle">
                    {transaction?.type}
                  </td>
                  <td className="align-middle">
                    {transaction?.amount?.toLocaleString("en-US")}
                  </td>
                  <td className="align-middle">
                    {transaction.createdDate
                      ? moment(transaction.createdDate).format("L")
                      : "-"}
                  </td>
                  <td className="align-middle">
                    {transaction?.payerName}
                  </td>
                  <td className="align-middle">
                    {transactionStatus[transaction?.status]}
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
