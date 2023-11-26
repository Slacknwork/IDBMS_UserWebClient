import React from "react";
import { Link } from "/navigation";

import urls from "/constants/urls";
import OverviewBreadcrumb from "../Overview/Breadcrumb";
import { getSiteById } from "../../../api/siteServices";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const SiteDetailsForm = (item) => {
  console.log(item)
  const site = item.site
  return (
    <div className="row">
      <div className="col col-lg-12 col-12">
        <OverviewBreadcrumb id={1} siteId={1}></OverviewBreadcrumb>
      </div>
      <div className="col col-lg-4 col-12">
        <h3>Site Information</h3>
      </div>
      <div className="col col-lg-4 col-12">
        <div className="form-field">
          <label className="mb-1">Site Name</label>
          <input type="text" name="name" placeholder="Your Name" value={site && site.name} />
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
          <label className="mb-1">Room Description</label>
          <textarea type="text" name="message" placeholder="Message"></textarea>
        </div>
      </div>
      <div className="col col-lg-6 col-12">
        <div className="row">
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Area</label>
              <input type="text" name="message" placeholder="Message"></input>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Price</label>
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
    </div>
  );
};

const FloorTableItem = (object) => {
  const RoomHref = urls.project.id.site.siteNo.floor.floorNo.getUri(1, 1, 1);
  const item = object.item;
  const no = object.index;

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "center" }}>
        {item && item.floorNo}
      </th>
      <td className="align-middle">{item && item.description}</td>
      <td className="align-middle">{item && item.usePurpose}</td>
      <td className="align-middle">{item && item.area}</td>
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

const FloorTable = (floorList) => {
  console.log(floorList)
  const values = floorList.floorList;
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
              Floor No
            </th>
            <th scope="col">Description</th>
            <th scope="col">Use Purpose</th>
            <th scope="col">Area</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((item, index) => (
              <FloorTableItem key={index} item={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

const BookingSiteDetails = () => {

  const [item, setItem] = useState([]);
  const [siteId, setSiteId] = useState("C83D510A-448C-4479-B35D-618BB17FA1BB");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getSiteById(siteId);
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
  }, [siteId]);

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <SiteDetailsForm site={item} />
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Floors</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <FloorTable floorList={item.floors} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingSiteDetails;
