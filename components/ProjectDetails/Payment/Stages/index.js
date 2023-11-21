"use client";

import React from "react";
import { Link } from "/navigation";
import { FaTrash } from "react-icons/fa";

import urls from "/constants/urls";

const StageItem = () => {
  const RoomHref =
    urls.project.booking.decor.site.siteNo.floor.floorNo.room.roomNo.getUri(
      1,
      1,
      1
    );

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "right" }}>
        1
      </th>
      <td className="align-middle">Room Name</td>
      <td className="align-middle">Site 1 Room 1</td>
      <td className="align-middle">1,000,000 VND</td>
      <td className="align-middle">1,000,000 VND</td>
      <td className="align-middle">doing</td>
      <td className="align-middle m-0">
        <div className="d-flex">
          <Link
            href={RoomHref}
            className="theme-btn m-1"
            style={{ width: "6rem", zIndex: 0 }}
          >
            Details
          </Link>
          <button
            type="button"
            className="theme-btn m-1"
            style={{ width: "3.5rem", backgroundColor: "crimson", zIndex: 0 }}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

const StageTable = () => {
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
            <th scope="col" style={{ width: "5rem" }}>
              No.
            </th>
            <th scope="col" style={{ width: "7rem" }}>
              Image
            </th>
            <th scope="col">Item name</th>
            <th scope="col">Location</th>
            <th scope="col">Created Date</th>
            <th scope="col">Updated Date</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <StageItem></StageItem>
          <StageItem></StageItem>
          <StageItem></StageItem>
          <StageItem></StageItem>
        </tbody>
      </table>
    </div>
  );
};

export default function PaymentStages() {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-5 col-12">
          <div className="blog-sidebar">
            <div className="widget search-widget mb-4">
              <form>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Item Name..."
                  />
                  <button type="submit">
                    <i className="ti-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col col-lg-3 col-12 my-auto">
          <div className="wpo-contact-pg-section">
            <form>
              <div className="wpo-contact-form-area-transparent row">
                <div className="form-field">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2"
                    style={{ backgroundColor: "white", height: "55px" }}
                  >
                    <option>Category</option>
                    <option>Architecture</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-12 col-12">
          <StageTable></StageTable>
        </div>
      </div>
    </div>
  );
}
