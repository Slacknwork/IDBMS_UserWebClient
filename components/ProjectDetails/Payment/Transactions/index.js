"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "/navigation";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import urls from "/constants/urls";
import transactionType from "/constants/enums/transactionType";
import transactionStatus from "/constants/enums/transactionStatus";

import { getTransactionsByProjectId } from "/api/transactionServices";

import AddModal from "./AddModal";

const TransactionItem = (object) => {
  const RoomHref =
    urls.project.booking.decor.site.siteNo.floor.floorNo.room.roomNo.getUri(
      1,
      1,
      1
    );
  const item = object.item;
  const no = object.index;

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "center" }}>
        {no}
      </th>
      <td className="align-middle">
        {item && item.amount && item.amount.toLocaleString("en-US")}
      </td>
      <td className="align-middle">{item && transactionType[item.type]}</td>
      <td className="align-middle">{item && item.note}</td>
      <td className="align-middle">
        {item && new Date(item.createdDate).toLocaleDateString("en-GB")}
      </td>
      <td className="align-middle">{item && transactionStatus[item.status]}</td>
      <td className="align-middle m-0">
        <div className="d-flex justify-content-end">
          <Link
            href={RoomHref}
            className="theme-btn m-1"
            style={{ width: "10rem", zIndex: 0 }}
          >
            Download receipt
          </Link>
        </div>
      </td>
    </tr>
  );
};

const TransactionTable = (transList) => {
  const values = transList.transList;
  return (
    <div
      style={{
        maxHeight: "25rem",
        overflowY: "scroll",
      }}
    >
      <table className="table table-striped table-hover">
        <thead
          className="shadow-sm"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          <tr>
            <th scope="col" style={{ width: "5rem", textAlign: "center" }}>
              No.
            </th>
            <th scope="col">Amount (VND)</th>
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
  const [values, setValues] = useState([]);
  // test project id "8B84897A-5A93-429C-A5B0-B11AE7483DD3"
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  async function getTransactions() {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getTransactionsByProjectId(params.id);
          initialized.current = false;
          setValues(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  }

  useEffect(() => {
    getTransactions();
  });

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
          <AddModal>Create</AddModal>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-12 col-12">
          <TransactionTable
            refreshTransactionList={getTransactions}
            transList={values}
          />
        </div>
      </div>
    </div>
  );
}
