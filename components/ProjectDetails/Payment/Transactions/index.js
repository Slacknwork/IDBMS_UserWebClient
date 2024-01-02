"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import transactionType from "/constants/enums/transactionType";
import transactionStatus from "/constants/enums/transactionStatus";

import {
  getTransactionsByProjectIdPagination,
  countTransactionsByProjectId,
} from "/services/transactionServices";

import AddModal from "./AddModal";
import { useSelector } from "react-redux";

import Pagination from "/components/Pagination";

const pageSize = 5;
const pageQuery = "page";

const TransactionItem = (object) => {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const onDownloadClick = (url) => {
    downloadFileFromUrl(url, user.token);
  };
  const item = object.item;
  const no = object.index;

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "center" }}>
        {no}
      </th>
      <td className="align-middle">
        {item.Amount.toLocaleString(params.locale) ||
          item.amount.toLocaleString(params.locale)}{" "}
        VND
      </td>
      <td className="align-middle">
        {item && (transactionType[item.type] || item.Type)}
      </td>
      <td className="align-middle">{item && item.Note}</td>
      <td className="align-middle">
        {item && new Date(item.CreatedDate).toLocaleDateString(params.locale)}
      </td>
      <td className="align-middle">
        {item && (transactionStatus[item.status] || item.Status)}
      </td>
      <td className="align-middle m-0">
        {item && item.TransactionReceiptImageUrl ? (
          <div className="d-flex justify-content-end">
            <button className="theme-btn m-1" style={{ zIndex: 0 }}>
              Download receipt
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </td>
    </tr>
  );
};

const TransactionTable = (transList) => {
  const values = transList.transList;
  return (
    <div style={{}}>
      <table className="table table-striped table-hover">
        <thead
          className="shadow-sm"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          <tr>
            <th scope="col" style={{ width: "5rem", textAlign: "center" }}>
              No.
            </th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Note</th>
            <th scope="col">Created Date</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((item, index) => (
              <TransactionItem key={index} item={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Transactions() {
  const params = useParams();
  const searchParams = useSearchParams();

  const [values, setValues] = useState([]);

  const [transactionCount, setTransactionCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get(pageQuery) ? Number(searchParams.get(pageQuery)) - 1 : 0
  );
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  const getTransactions = async () => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getTransactionsByProjectIdPagination(
            params.id,
            pageSize,
            currentPage
          );
          const count = await countTransactionsByProjectId(params.id);
          initialized.current = false;
          setValues(data.value);
          setTransactionCount(count);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      await fetchDataFromApi();
    }
  };

  useEffect(() => {
    getTransactions();
  }, [currentPage]);

  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col col-lg-12 col-12">
          <div className="form-field">
            <h1>Transactions</h1>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="my-auto">
            <form>
              <div className="wpo-contact-form-area-transparent row">
                <div className="form-field">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      width: "15rem",
                    }}
                  >
                    <option value={-1}>Transaction Type</option>
                    {transactionType.map((type, index) => (
                      <option key={type} value={index}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="my-auto">
            <form>
              <div className="row">
                <div className="form-field">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      width: "15rem",
                    }}
                  >
                    <option value={-1}>Transaction Status</option>
                    {transactionStatus.map((type, index) => (
                      <option key={type} value={index}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex">
          <AddModal refreshTransactionList={getTransactions}>Create</AddModal>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-12 col-12">
          <TransactionTable transList={values} />
        </div>
        <div className="col col-lg-12 col-12">
          <Pagination
            pageCount={Math.ceil(transactionCount / pageSize)}
            pageQuery={pageQuery}
            onClick={(i) => {
              setCurrentPage(i);
            }}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
