import React from "react";
import { Link } from "/navigation";
import { FaTrash } from "react-icons/fa";

import urls from "/constants/urls";
import { getProjectDocumentsByProjectId } from "../../../api/projectDocumentServices";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const DocumentTableItem = (object) => {
  const DocumentHref =
    urls.project.booking.decor.site.siteNo.floor.floorNo.room.roomNo.getUri(
      1,
      1,
      1
    );
  const item = object.item;
  const no = object.index;

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "center" }}>
        {no}
      </th>
      <td className="align-middle">{item && item.name}</td>
      <td className="align-middle">{item && item.description}</td>
      <td className="align-middle">{item && item.category}</td>
      <td className="align-middle">
        {item && new Date(item.createdDate).toLocaleDateString("en-GB")}
      </td>
      <td className="align-middle m-0">
        <div className="d-flex">
          <Link
            href={DocumentHref}
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

const DocumentTable = (docList) => {
  console.log(docList)
  const values = docList.docList;
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
            <th scope="col" style={{ width: "5rem", textAlign: "center" }}>
              No.
            </th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Created Date</th>
            <th scope="col" style={{ width: "11rem", textAlign: "center" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((item, index) => (
              <DocumentTableItem key={index} item={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Documents() {

  const [values, setValues] = useState([]);
  const [projectId, setProjectId] = useState("ff090f51-e6e7-4854-8f3f-0402ee32c9f8");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectDocumentsByProjectId(projectId);
          console.log(data);
          setValues(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  }, [projectId]);

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
                    placeholder="Search Document.."
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
        <div className="col col-lg-1 offset-lg-3 col-12">
          <Link className="theme-btn px-4" href="/project/1/items">
            Add
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-12 col-12">
          <DocumentTable docList={values} />
        </div>
      </div>
    </div>
  );
}
