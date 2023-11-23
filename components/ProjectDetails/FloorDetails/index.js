"use client";

import React from "react";
import { Link } from "/navigation";

import urls from "/constants/urls";

import OverviewBreadcrumb from "../Overview/Breadcrumb";

const FloorDetailsForm = () => {
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
          <input type="text" name="name" placeholder="Your Name" />
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
          <textarea type="text" name="message" placeholder="Message"></textarea>
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
    </div>
  );
};

const RoomTableItem = () => {
  const RoomHref = urls.project.id.site.siteNo.floor.floorNo.room.roomNo.getUri(
    1,
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
      <td className="align-middle">1000m2</td>
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
            <th scope="col" style={{ width: "6rem" }}>
              Room No.
            </th>
            <th scope="col">Name</th>
            <th scope="col">Area</th>
            <th scope="col">Price</th>
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

export default function FloorDetails() {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <FloorDetailsForm></FloorDetailsForm>
        <div className="row">
          <h3 className="my-auto">Rooms</h3>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <RoomTable></RoomTable>
          </div>
        </div>
      </form>
    </div>
  );
}
