"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { editRoom } from "/store/reducers/draftProject";

import calculationUnit from "/constants/enums/calculationUnit";

import { getAllRoomTypes } from "/api/roomTypeServices";

import SuggestionModal from "./SuggestionModal";
import DeleteModal from "./DeleteModal";

function RoomUsePurposeField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftRoom =
    draftProject.sites[params.siteNo].floors[params.floorNo].rooms[
      params.roomNo
    ];

  const [value, setValue] = useState(draftRoom?.usePurpose);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(
      editRoom({
        siteNo: params.siteNo,
        floorNo: params.floorNo,
        roomNo: params.roomNo,
        usePurpose: e.target.value,
      })
    );
  };

  return (
    <div className="form-field">
      <label className="mb-1">Use purpose</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

function RoomTypeField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftRoom =
    draftProject.sites[params.siteNo].floors[params.floorNo].rooms[
      params.roomNo
    ];

  const [value, setValue] = useState(draftRoom?.roomTypeId);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getAllRoomTypes();
          setRoomTypes(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(
      editRoom({
        siteNo: params.siteNo,
        floorNo: params.floorNo,
        roomNo: params.roomNo,
        roomTypeId: Number(e.target.value),
        roomTypeName: roomTypes.find(
          (roomType) => roomType.id === Number(e.target.value)
        ).name,
        pricePerArea: roomTypes.find(
          (roomType) => roomType.id === Number(e.target.value)
        ).pricePerArea,
      })
    );
  };

  return (
    <div className="form-field">
      <label className="mb-1">Room Type</label>
      <select
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {roomTypes.map((roomType) => (
          <option key={roomType.id} value={roomType.id}>
            {roomType.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function RoomAreaField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftRoom =
    draftProject.sites[params.siteNo].floors[params.floorNo].rooms[
      params.roomNo
    ];

  const [value, setValue] = useState(draftRoom?.area);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(
      editRoom({
        siteNo: params.siteNo,
        floorNo: params.floorNo,
        roomNo: params.roomNo,
        area: Number(e.target.value),
      })
    );
  };

  return (
    <div className="form-field">
      <label className="mb-1">
        Area in m<sup>2</sup>
      </label>
      <input
        type="number"
        placeholder="Room area"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

function RoomDescriptionField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftRoom =
    draftProject.sites[params.siteNo].floors[params.floorNo].rooms[
      params.roomNo
    ];

  const [value, setValue] = useState(draftRoom?.description);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(
      editRoom({
        siteNo: params.siteNo,
        floorNo: params.floorNo,
        roomNo: params.roomNo,
        description: e.target.value,
      })
    );
  };

  return (
    <div className="form-field">
      <label className="mb-1">Room Description</label>
      <textarea
        type="text"
        placeholder="Message"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      ></textarea>
    </div>
  );
}

function RoomDetailsForm() {
  return (
    <div className="row">
      <div className="col col-lg-3 col-12">
        <h3>Room Information</h3>
      </div>
      <div className="col col-lg-3 col-12">
        <RoomUsePurposeField></RoomUsePurposeField>
      </div>
      <div className="col col-lg-3 col-12">
        <RoomTypeField></RoomTypeField>
      </div>
      <div className="col col-lg-3 col-12">
        <RoomAreaField></RoomAreaField>
      </div>
      <div className="col col-lg-12 col-12">
        <RoomDescriptionField></RoomDescriptionField>
      </div>
    </div>
  );
}

function SuggestionTableItem({ task, index }) {
  return (
    <tr>
      <th scope="row" className="align-middle text-center">
        {index + 1}
      </th>
      <td className="align-middle">{task.name}</td>
      <td className="align-middle">{task.interiorItemName}</td>
      <td className="align-middle">{calculationUnit[task.calculationUnit]}</td>
      <td className="align-middle" style={{ textAlign: "right" }}>
        {task.unitInContract}
      </td>
      <td className="align-middle m-0">
        <div className="d-flex justify-content-end">
          <SuggestionModal title={`${task.name}`} task={task} index={index}>
            Details
          </SuggestionModal>
        </div>
      </td>
    </tr>
  );
}

function SuggestionTable() {
  const params = useParams();
  const draftProject = useSelector((state) => state.draftProject);
  const draftRoom =
    draftProject.sites[params.siteNo].floors[params.floorNo].rooms[
      params.roomNo
    ];

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
            <th scope="col">Name</th>
            <th scope="col">Interior Item</th>
            <th scope="col">Unit</th>
            <th scope="col" style={{ textAlign: "right" }}>
              Quantity
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {draftRoom?.tasks?.map((task, index) => (
            <SuggestionTableItem
              key={task.id}
              task={task}
              index={index}
            ></SuggestionTableItem>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RoomDetails() {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <RoomDetailsForm></RoomDetailsForm>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Task Suggestions</h3>
              <div className="d-flex">
                <SuggestionModal title={`Add Task Suggestion`}>
                  Add
                </SuggestionModal>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <SuggestionTable></SuggestionTable>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <DeleteModal></DeleteModal>
        </div>
      </form>
    </div>
  );
}
