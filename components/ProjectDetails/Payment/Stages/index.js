"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "/navigation";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

import urls from "/constants/urls";

import { getPaymentStagesByProjectId } from "/api/paymentStageServices";

const StageItem = (object) => {
  const params = useParams();

  const item = object.item;
  const TransactionHref = urls.project.id.payment.transactions.getUri(
    params.id
  );

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "center" }}>
        {item && item.stageNo}
      </th>
      <td className="align-middle">{item && item.name}</td>
      <td className="align-middle">{item && item.description}</td>
      <td className="align-middle">
        {item && new Date(item.startedDate).toLocaleDateString("en-GB")}
      </td>
      <td className="align-middle">
        {item && new Date(item.endTimePayment).toLocaleDateString("en-GB")}
      </td>
      <td className="align-middle">{item && item.isPrepaid ? "Yes" : "No"}</td>
      <td className="align-middle">{item && item.isPaid ? "Yes" : "No"}</td>
      <td className="align-middle m-0">
        <div className="d-flex justify-content-end">
          <Link
            href={TransactionHref}
            className="theme-btn m-1"
            style={{ width: "6rem", zIndex: 0 }}
          >
            Pay
          </Link>
        </div>
      </td>
    </tr>
  );
};

const StageTable = (stageList) => {
  console.log(stageList);
  const values = stageList.stageList;
  return (
    <div
      style={{
        height: "25rem",
        overflowY: "scroll",
      }}
    >
      <table className="table table-striped table-hover">
        <thead
          className="shadow-sm"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          <tr>
            <th scope="col" style={{ width: "7rem", textAlign: "center" }}>
              No.
            </th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Started Date</th>
            <th scope="col">End Time Payment</th>
            <th scope="col">Prepaid</th>
            <th scope="col">Paid</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((item, index) => (
              <StageItem key={item.id} item={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function PaymentStages() {
  const params = useParams();

  const [values, setValues] = useState([]);
  const [projectId, setProjectId] = useState(params.id);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getPaymentStagesByProjectId(projectId);
          console.log(data);
          setValues(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  }, [projectId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <div className="form-field">
            <h1>Payment Stages</h1>
          </div>
        </div>
        <div className="col col-lg-12 col-12 mt-2">
          <StageTable stageList={values} />
        </div>
      </div>
    </div>
  );
}
