"use client";

import { useState } from "react";
import { Link, useRouter } from "/navigation";
import { FaTrash } from "react-icons/fa";
import { useParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { editFloor, addRoom } from "/store/reducers/draftProject";

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

function RoomTableItem({ room, index }) {
  const params = useParams();
  console.log(room);
  const RoomHref =
    urls.project.booking.decor.site.siteNo.floor.floorNo.room.roomNo.getUri(
      params.siteNo,
      params.floorNo,
      index
    );

  return (
    <tr>
      <th scope="row" className="align-middle text-center">
        {index + 1}
      </th>
      <td className="align-middle">{room.roomTypeName}</td>
      <td className="align-middle">{room.usePurpose}</td>
      <td className="align-middle">
        {room.area} m<sup>2</sup>
      </td>
      <td className="align-middle">
        {(room.area * room.pricePerArea).toLocaleString("vi-VN")} VND
      </td>
      <td className="align-middle m-0">
        <div className="d-flex justify-content-end">
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
}

function RoomTable() {
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const rooms = draftProject.sites[params.siteNo].floors[params.floorNo].rooms;

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
            <th scope="col" style={{ width: "4rem" }}>
              No.
            </th>
            <th scope="col">Room Type</th>
            <th scope="col">Use purpose</th>
            <th scope="col">Area</th>
            <th scope="col">Price</th>
            <th scope="col" style={{ width: "12rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <RoomTableItem
              room={room}
              index={index}
              key={room.id}
            ></RoomTableItem>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BookingFloorDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftFloor = draftProject.sites[params.siteNo].floors[params.floorNo];

  const handleAddRoomClick = () => {
    dispatch(addRoom({ siteNo: params.siteNo, floorNo: params.floorNo }));
    router.push(
      urls.project.booking.decor.site.siteNo.floor.floorNo.room.roomNo.getUri(
        params.siteNo,
        params.floorNo,
        draftFloor.rooms.length
      )
    );
  };

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <FloorDetailsForm></FloorDetailsForm>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Rooms</h3>
              <div className="d-flex">
                <button
                  type="button"
                  className="theme-btn-s4 px-4 py-2"
                  onClick={handleAddRoomClick}
                >
                  Add
                </button>
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
}
