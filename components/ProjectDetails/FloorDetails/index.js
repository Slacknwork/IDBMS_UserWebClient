"use client";

import React from "react";
import { Link } from "/navigation";

import urls from "/constants/urls";

import OverviewBreadcrumb from "../Overview/Breadcrumb";
import { getFloorById } from "../../../api/FloorServices";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const FloorDetailsForm = (item) => {
  console.log(item)
  const floor = item.floor
  return (
    <div className="row">
      <div className="col col-lg-12 col-12">
        <OverviewBreadcrumb id={1} siteId={1} floorId={1}></OverviewBreadcrumb>
      </div>
      <div className="col col-lg-4 col-12">
        <h3>Floor Information</h3>
      </div>
      <div className="col col-lg-4 col-12">
        <div className="form-field">
          <label className="mb-1">Floor Name</label>
          <input type="text" name="name" placeholder="Your Name" value={floor && floor.floorNo} />
        </div>
      </div>
      <div className="col col-lg-4 col-12">
        <div className="form-field">
          <label className="mb-1">Use purpose</label>
          <input type="text" name="name" placeholder="Use purpose" />
        </div>
      </div>
      <div className="col col-lg-6 col-12">
        <div className="form-field">
          <label className="mb-1">Floor Description</label>
          <textarea type="text" name="message" placeholder="Message" value={floor && floor.description}></textarea>
        </div>
      </div>
      <div className="col col-lg-6 col-12">
        <div className="row">
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Total area</label>
              <input type="text" name="message" placeholder="Message"></input>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Total price</label>
              <input type="text" name="message" placeholder="Message"></input>
            </div>
          </div>
        </div>
        <div className="form-field">
          <div className="d-flex gap-4">
            <label className="my-auto">Tasks</label>
            <div className="d-flex">
              <Link href={`/project/1/tasks`} className="theme-btn px-4">
                View Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

const RoomTableItem = (object) => {
  const RoomHref = urls.project.id.site.siteNo.floor.floorNo.room.roomNo.getUri(
    1,
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
      <td className="align-middle">{item && item.usePurpose}</td>
      <td className="align-middle">{item && item.description}</td>
      <td className="align-middle">{item && item.area}</td>
      <td className="align-middle">{item && item.roomType?.name}</td>
      <td className="align-middle">{item && (item.area * item.pricePerArea).toLocaleString('en-US')}</td>
      <td className="align-middle m-0">
        <div className="d-flex">
          <Link
            href={RoomHref}
            className="theme-btn m-1"
            style={{ width: "6rem", zIndex: 0 }}
          >
            Details
          </Link>
        </div>
      </td>
    </tr>
  );
};

const RoomTable = (roomList) => {
  console.log(roomList)
  const values = roomList.roomList;
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
            <th scope="col" style={{ width: "6rem" }}>
              No.
            </th>
            <th scope="col">Use Purpose</th>
            <th scope="col">Description</th>
            <th scope="col">Area</th>
            <th scope="col">Room Type</th>
            <th scope="col">Total Price (VND)</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
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

  const [item, setItem] = useState([]);
  const [floorId, setFloorId] = useState("2A398774-E041-4C23-8D2E-8E6AEF6B3095");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getFloorById(floorId);
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
  }, [floorId]);

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <FloorDetailsForm floor={item} />
        <div className="row">
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
