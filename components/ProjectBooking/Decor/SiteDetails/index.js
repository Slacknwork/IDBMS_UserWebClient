"use client";

import { useState } from "react";
import { Link, useRouter } from "/navigation";
import { FaTrash } from "react-icons/fa";
import { useParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { editSite, addFloor } from "/store/reducers/draftProject";

import urls from "/constants/urls";

function SiteNameField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftSite = draftProject.sites[params.siteNo];

  const [value, setValue] = useState(draftSite.name);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(editSite({ siteNo: params.siteNo, name: e.target.value }));
  };

  return (
    <div className="form-field">
      <label className="mb-1">Site Name</label>
      <input
        type="text"
        placeholder="Enter site name"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

function SiteUsePurposeField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftSite = draftProject.sites[params.siteNo];

  const [value, setValue] = useState(draftSite.usePurpose);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(
      editSite({
        siteNo: params.siteNo,
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
        placeholder="Use purpose"
      />
    </div>
  );
}

function SiteAddressField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftSite = draftProject.sites[params.siteNo];

  const [value, setValue] = useState(draftSite.address);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(
      editSite({
        siteNo: params.siteNo,
        address: e.target.value,
      })
    );
  };
  return (
    <div className="form-field">
      <label className="mb-1">Address</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Use purpose"
      />
    </div>
  );
}

function SiteDescriptionField() {
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftSite = draftProject.sites[params.siteNo];

  const [value, setValue] = useState(draftSite.description);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(
      editSite({
        siteNo: params.siteNo,
        description: e.target.value,
      })
    );
  };
  return (
    <div className="form-field">
      <label className="mb-1">Site description</label>
      <textarea
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Site description"
      />
    </div>
  );
}

const SiteDetailsForm = () => {
  return (
    <div className="row">
      <div className="col col-lg-12 col-12">
        <h3>Site Information</h3>
      </div>
      <div className="col col-lg-4 col-12">
        <SiteNameField></SiteNameField>
      </div>
      <div className="col col-lg-4 col-12">
        <SiteUsePurposeField></SiteUsePurposeField>
      </div>
      <div className="col col-lg-4 col-12">
        <SiteAddressField></SiteAddressField>
      </div>
      <div className="col col-lg-12 col-12">
        <SiteDescriptionField></SiteDescriptionField>
      </div>
    </div>
  );
};

function FloorTableItem({ floor, index }) {
  const params = useParams();
  const RoomHref = urls.project.booking.decor.site.siteNo.floor.floorNo.getUri(
    params.siteNo,
    index
  );

  return (
    <tr>
      <th scope="row" className="align-middle text-center">
        {index + 1}
      </th>
      <td className="align-middle">{floor.usePurpose}</td>
      <td className="align-middle">
        {floor.totalArea} m<sup>2</sup>
      </td>
      <td className="align-middle">
        {floor.totalPrice.toLocaleString("vi-VN")} VND
      </td>
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
      <td className="align-middle m-0">
        <div className="my-auto m-1">
          <button
            type="button"
            className="theme-btn p-0 my-1"
            style={{ zIndex: 0 }}
          >
            Up
          </button>
          <button
            type="button"
            className="theme-btn p-0 my-1"
            style={{ zIndex: 0 }}
          >
            Down
          </button>
        </div>
      </td>
    </tr>
  );
}

const FloorTable = () => {
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const floors = draftProject.sites[params.siteNo].floors;

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
            <th scope="col">Use purpose</th>
            <th scope="col">Total Area</th>
            <th scope="col">Total Price</th>
            <th scope="col" style={{ width: "12rem" }}>
              Actions
            </th>
            <th scope="col" style={{ width: "6rem" }}>
              Move
            </th>
          </tr>
        </thead>
        <tbody>
          {floors.map((floor, index) => (
            <FloorTableItem
              floor={floor}
              index={index}
              key={floor.id}
            ></FloorTableItem>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function BookingSiteDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();

  const draftProject = useSelector((state) => state.draftProject);
  const draftSite = draftProject.sites[params.siteNo];

  const handleAddFloorClick = () => {
    dispatch(addFloor({ siteNo: params.siteNo }));
    router.push(
      urls.project.booking.decor.site.siteNo.floor.floorNo.getUri(
        params.siteNo,
        draftSite.floors.length
      )
    );
  };
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <SiteDetailsForm></SiteDetailsForm>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Floors</h3>
              <div className="d-flex">
                <button
                  type="button"
                  onClick={handleAddFloorClick}
                  className="theme-btn-s4 px-4 py-2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <FloorTable></FloorTable>
          </div>
        </div>
      </form>
    </div>
  );
}
