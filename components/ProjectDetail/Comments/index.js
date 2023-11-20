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
      <td className="align-middle">1,000,000 VND</td>
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
            <th scope="col" style={{ width: "6rem" }}>
              No.
            </th>
            <th scope="col">Content</th>
            <th scope="col">Task</th>
            <th scope="col">Created Date</th>
            <th scope="col">From</th>
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

export default function Comments() {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <RoomTable></RoomTable>
        </div>
      </div>
    </div>
  );
}
