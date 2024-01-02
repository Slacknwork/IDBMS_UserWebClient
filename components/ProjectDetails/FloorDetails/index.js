"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "/navigation";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import OverviewBreadcrumb from "./Breadcrumb";

import { getFloorById } from "/services/FloorServices";

const FloorDetailsForm = ({ floor }) => {
  const params = useParams();
  return (
    <div className="row">
      <div className="col col-lg-12 col-12">
        <OverviewBreadcrumb
          id={params.id}
          siteId={params.siteId}
          floorId={floor.id}
        ></OverviewBreadcrumb>
      </div>
      <div className="col col-lg-12 col-12">
        <div className="form-field">
          <h2>Floor {floor.floorNo == 0 ? "G" : floor.floorNo}</h2>
        </div>
      </div>
      <div className="col col-lg-12 col-12">
        <div className="col col-lg-12 col-12">
          <table>
            <tbody>
              <tr>
                <td style={{ paddingRight: "2rem" }}>
                  <p style={{ fontWeight: 1000 }}>Use purpose:</p>
                </td>
                <td>
                  <p>{floor.usePurpose}</p>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: "2rem" }}>
                  <p style={{ fontWeight: 1000 }}>Area:</p>
                </td>
                <td>
                  <p>
                    {floor.area} m<sup>2</sup>
                  </p>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: "2rem" }}>
                  <p style={{ fontWeight: 1000 }}>Description:</p>
                </td>
                <td>
                  <p>{floor.description}</p>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: "2rem" }}>
                  <p style={{ fontWeight: 1000 }}>Tasks:</p>
                </td>
                <td className="d-flex">
                  <div className="d-flex">
                    <Link
                      href={`/project/1/tasks`}
                      className="theme-btn px-4 py-2"
                    >
                      View Tasks
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RoomTableItem = ({ item, index }) => {
  const params = useParams();

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "center" }}>
        {index}
      </th>
      <td className="align-middle">{item && item.usePurpose}</td>
      <td className="align-middle">{item && item.description}</td>
      <td className="align-middle">
        {item && item.area} m<sup>2</sup>
      </td>
      <td className="align-middle">{item && item.roomType?.name}</td>
      <td className="align-middle">
        {item && (item.area * item.pricePerArea).toLocaleString(params.locale)}{" "}
        VND
      </td>
      <td className="align-middle m-0">
        <div className="d-flex justify-content-end">
          <Link href={""} className="theme-btn m-1 px-2 py-2">
            Tasks
          </Link>
          <Link href={""} className="theme-btn m-1 px-3 py-2">
            Suggest
          </Link>
        </div>
      </td>
    </tr>
  );
};

const RoomTable = (roomList) => {
  console.log(roomList);
  const values = roomList.roomList;
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
            <th scope="col" style={{ width: "6rem" }}>
              No.
            </th>
            <th scope="col">Use Purpose</th>
            <th scope="col">Description</th>
            <th scope="col">Area</th>
            <th scope="col">Room Type</th>
            <th scope="col">Total Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((item, index) => (
              <RoomTableItem key={index} item={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function FloorDetails() {
  const params = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getFloorById(params.floorId);
          console.log(data);
          setItem(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  });

  return (
    <div className="pb-0 container">
      <form className="contact-validation-active">
        <FloorDetailsForm floor={item} />
        <div className="row my-4">
          <h3 className="my-auto">Rooms</h3>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <RoomTable roomList={item.rooms} />
          </div>
        </div>
      </form>
    </div>
  );
}
