import React from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

import urls from "/constants/urls";

const RoomTableItem = () => {
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

const RoomTable = () => {
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
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Created Date</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <RoomTableItem></RoomTableItem>
          <RoomTableItem></RoomTableItem>
          <RoomTableItem></RoomTableItem>
          <RoomTableItem></RoomTableItem>
        </tbody>
      </table>
    </div>
  );
};

export default function Documents() {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-5 col-12">
          <div className="blog-sidebar">
            <div className="widget search-widget mb-4">
              <form>
                <label className="mb-1">Task Name</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Post.."
                  />
                  <button type="submit">
                    <i className="ti-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col col-lg-3 col-12">
          <div className="wpo-contact-pg-section">
            <form>
              <div className="wpo-contact-form-area-transparent row">
                <div className="form-field">
                  <label className="mb-1">Category</label>
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2"
                    style={{ backgroundColor: "white" }}
                  >
                    <option>Service</option>
                    <option>Architecture</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col col-lg-1 offset-lg-3 col-12 mt-0 mb-4 my-lg-4">
          <Link className="theme-btn px-4" href="/project/1/items">
            Add
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-12 col-12">
          <RoomTable></RoomTable>
        </div>
      </div>
    </div>
  );
}
