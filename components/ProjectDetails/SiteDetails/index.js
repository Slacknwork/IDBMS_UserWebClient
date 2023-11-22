import React from "react";
import { Link } from "/navigation";

import urls from "/constants/urls";

const SiteDetailsForm = () => {
  const breadcrumbHrefs = {
    overviewHref: urls.project.id.getUri(1),
    siteHref: urls.project.id.site.siteNo.getUri(1, 1),
  };

  return (
    <div className="row">
      <div className="col col-lg-12 col-12">
        <div className="wpo-breadcumb-wrap">
          <ol>
            <li>
              <Link href={breadcrumbHrefs.overviewHref}>Overview</Link>
            </li>
            <li>
              <Link href={breadcrumbHrefs.siteHref}>Site 1</Link>
            </li>
          </ol>
        </div>
      </div>
      <div className="col col-lg-4 col-12">
        <h3>Site Information</h3>
      </div>
      <div className="col col-lg-4 col-12">
        <div className="form-field">
          <label className="mb-1">Site Name</label>
          <input type="text" name="name" placeholder="Your Name" />
        </div>
      </div>
      <div className="col col-lg-4 col-12">
        <div className="form-field">
          <label className="mb-1">Use purpose</label>
          <input type="text" name="name" placeholder="Use purpose" />
        </div>
      </div>
      <div className="col col-lg-12 col-12">
        <div className="form-field">
          <label className="mb-1">Site Description</label>
          <textarea type="text" name="message" placeholder="Message"></textarea>
        </div>
      </div>
    </div>
  );
};

const FloorTableItem = () => {
  const RoomHref = urls.project.id.site.siteNo.floor.floorNo.getUri(1, 1, 1);

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "right" }}>
        1
      </th>
      <td className="align-middle">Floor Name</td>
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

const FloorTable = () => {
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
              Floor No.
            </th>
            <th scope="col">Name</th>
            <th scope="col">Total Area</th>
            <th scope="col">Total Price</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <FloorTableItem></FloorTableItem>
          <FloorTableItem></FloorTableItem>
          <FloorTableItem></FloorTableItem>
          <FloorTableItem></FloorTableItem>
          <FloorTableItem></FloorTableItem>
          <FloorTableItem></FloorTableItem>
        </tbody>
      </table>
    </div>
  );
};

const BookingSiteDetails = () => {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <SiteDetailsForm></SiteDetailsForm>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Floors</h3>
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
};

export default BookingSiteDetails;
