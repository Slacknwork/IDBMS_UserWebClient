import React, { useRef, useState, useEffect } from "react";
import { Link } from "/navigation";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { getProjectById } from "/services/projectServices";
import urls from "/constants/urls";

import OverviewBreadcrumb from "./Breadcrumb";
import { getSiteById } from "/services/siteServices";

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
        {floor.floorNo == 0 ? "G" : floor.floorNo}
      </th>
      <td className="align-middle">{floor && floor.description}</td>
      <td className="align-middle">{floor && floor.usePurpose}</td>
      <td className="align-middle">
        {floor && floor.area} m<sup>2 </sup>
      </td>
      <td className="align-middle m-0">
        <div className="d-flex justify-content-end">
          <Link href={FloorHref} className="theme-btn m-1 py-2">
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
        maxHeight: "25rem",
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
              Floor
            </th>
            <th scope="col">Description</th>
            <th scope="col">Use Purpose</th>
            <th scope="col">Area</th>
            <th scope="col"></th>
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
    <div className="pb-0 container">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12">
            <OverviewBreadcrumb id={params.id}></OverviewBreadcrumb>
          </div>
          <div className="col col-lg-12 col-12 mb-4">
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