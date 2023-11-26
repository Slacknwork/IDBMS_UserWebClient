import React, { useRef, useState, useEffect } from "react";
import { Link } from "/navigation";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { getProjectById } from "/api/projectServices";
import urls from "/constants/urls";

import OverviewBreadcrumb from "../Overview/Breadcrumb";
import { getSiteById } from "/api/siteServices";

const SiteDetailsForm = ({ site, project }) => {
  return (
    <div className="row">
      <div className="col col-lg-12 col-12">
        <OverviewBreadcrumb
          id={project.id}
          name={project.name}
          siteId={site.id}
          siteName={site && site.name}
        ></OverviewBreadcrumb>
      </div>
      <div className="col col-lg-12 col-12">
        <div className="form-field">
          <h3>Site: {site.name}</h3>
        </div>
      </div>
      <div className="col col-lg-6 col-12">
        <div className="form-field">
          <label className="mb-1">Use purpose</label>
          <input type="text" value={site.usePurpose} disabled />
        </div>
      </div>
      <div className="col col-lg-6 col-12">
        <div className="form-field">
          <label className="mb-1">Address</label>
          <input type="text" value={site.address} disabled />
        </div>
      </div>
      <div className="col col-lg-6 col-12">
        <div className="form-field">
          <label className="mb-1">Room Description</label>
          <textarea type="text" value={site.description} disabled></textarea>
        </div>
      </div>
      <div className="col col-lg-6 col-12">
        <div className="row">
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">
                Area in m<sup>2</sup>
              </label>
              <input type="text" value={site.area} disabled />
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

function FloorTableItem({ floor, index }) {
  const params = useParams();
  const FloorHref = urls.project.id.site.siteNo.floor.floorNo.getUri(
    params.id,
    params.siteId,
    floor.id
  );

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "center" }}>
        {floor && floor.floorNo}
      </th>
      <td className="align-middle">{floor && floor.description}</td>
      <td className="align-middle">{floor && floor.usePurpose}</td>
      <td className="align-middle">{floor && floor.area}</td>
      <td className="align-middle m-0">
        <div className="d-flex">
          <Link
            href={FloorHref}
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

const FloorTable = (floorList) => {
  console.log(floorList);
  const values = floorList.floorList;
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
              Floor No
            </th>
            <th scope="col">Description</th>
            <th scope="col">Use Purpose</th>
            <th scope="col">Area</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((item, index) => (
              <FloorTableItem key={item.id} floor={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function ProjectSiteDetails() {
  const params = useParams();
  const [item, setItem] = useState([]);
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getSiteById(params.siteId);
          const projectFetch = await getProjectById(params.id);
          setItem(data);
          setProject(projectFetch);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  });

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <SiteDetailsForm site={item} project={project} />
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Floors</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <FloorTable floorList={item.floors} />
          </div>
        </div>
      </form>
    </div>
  );
}
