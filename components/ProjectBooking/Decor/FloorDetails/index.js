"use client";

import { useState } from "react";
import { Link } from "/navigation";
import { FaTrash } from "react-icons/fa";
import { useParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { editFloor } from "/store/reducers/draftProject";

import urls from "/constants/urls";

function FloorUsePurposeField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftFloor = draftProject.sites[params.siteNo].floors[params.floorNo];

  const [value, setValue] = useState(draftFloor.usePurpose);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(
      editFloor({
        siteNo: params.siteNo,
        floorNo: params.floorNo,
        usePurpose: e.target.value,
      })
    );
  };

  return (
    <div className="form-field">
      <label className="mb-1">Use purpose</label>
      <input
        type="text"
        placeholder="Enter floor use purpose"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

function FloorDescriptionField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftFloor = draftProject.sites[params.siteNo].floors[params.floorNo];

  const [value, setValue] = useState(draftFloor.description);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(
      editFloor({
        siteNo: params.siteNo,
        floorNo: params.floorNo,
        description: e.target.value,
      })
    );
  };

  return (
    <div className="form-field">
      <label className="mb-1">Floor description</label>
      <textarea
        type="text"
        placeholder="Enter floor description"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

const FloorDetailsForm = () => {
  return (
    <div className="row">
      <div className="col col-lg-6 col-12">
        <h3>Floor Information</h3>
      </div>
      <div className="col col-lg-6 col-12">
        <FloorUsePurposeField></FloorUsePurposeField>
      </div>
      <div className="col col-lg-12 col-12">
        <FloorDescriptionField></FloorDescriptionField>
      </div>
    </div>
  );
};

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

const BookingSiteDetails = () => {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <FloorDetailsForm></FloorDetailsForm>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Rooms</h3>
              <div className="d-flex">
                <button className="theme-btn-s4 px-4 py-2">Add</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <RoomTable></RoomTable>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingSiteDetails;
