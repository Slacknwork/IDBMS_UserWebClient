"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Link } from "/navigation";
import { useParams } from "next/navigation";

import { Chip } from "@mui/material";

import urls from "/constants/urls";
import projectTypes from "/constants/enums/projectType";
import projectStatus from "/constants/enums/projectStatus";

import { getProjectById } from "/api/projectServices";

import OverviewBreadcrumb from "./Breadcrumb";

export default function ProjectOverview() {
  const params = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectById(params.id);
          console.log(data);
          setProject(data);
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
    <div className="container wpo-service-single-area">
      <div className="row justify-content-center wpo-service-single-wrap">
        <div className="col col-lg-12 col-12">
          <OverviewBreadcrumb id={params.id}></OverviewBreadcrumb>
        </div>
        <div className="col col-lg-12 col-12 mb-2">
          <div className="form-field">
            <div className="d-flex">
              <h1>{project.name}</h1>
              <Chip
                sx={{ ml: 2, mt: 1 }}
                label={projectStatus[project.status]}
              ></Chip>
            </div>
            <div className="d-flex align-content-center">
              <h4>{projectTypes[project.type]}</h4>
            </div>
          </div>
          <div className="form-field mt-2">
            <p style={{ fontSize: 18 }}>{project.description}</p>
          </div>
        </div>
        <div className="col col-lg-4 col-12">
          <div className="form-field">
            <h4>Project Info</h4>
          </div>
          <div className="form-field">
            <td style={{ paddingRight: "1rem" }}>
              <p style={{ fontWeight: 1000 }}>Project Category:</p>
            </td>
            <td style={{ paddingRight: "4rem" }}>
              <p>{project.projectCategory?.name}</p>
            </td>
            <tr>
              <td style={{ paddingRight: "1rem" }}>
                <p style={{ fontWeight: 1000 }}>Created Date:</p>
              </td>
              <td style={{ paddingRight: "4rem" }}>
                <p>
                  {new Date(project.createdDate).toLocaleDateString(
                    params.locale
                  )}
                </p>
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: "1rem" }}>
                <p style={{ fontWeight: 1000 }}>Updated Date:</p>
              </td>
              <td style={{ paddingRight: "4rem" }}>
                <p>
                  {new Date(project.updatedDate).toLocaleDateString(
                    params.locale
                  )}
                </p>
              </td>
            </tr>
          </div>
        </div>
        <div className="col col-lg-8 col-12">
          <div className="form-field">
            <h4>Company Info</h4>
          </div>
          <div className="form-field">
            <tr>
              <td style={{ paddingRight: "1rem" }}>
                <p style={{ fontWeight: 1000 }}>Company Name:</p>
              </td>
              <td colSpan={3} style={{ paddingRight: "1rem" }}>
                <p>{project.companyName}</p>
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: "1rem" }}>
                <p style={{ fontWeight: 1000 }}>Company Address:</p>
              </td>
              <td colSpan={3} style={{ paddingRight: "1rem" }}>
                <p>{project.companyAddress}</p>
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: "1rem" }}>
                <p style={{ fontWeight: 1000 }}>Company Code:</p>
              </td>
              <td colSpan={3} style={{ paddingRight: "1rem" }}>
                <p>{project.companyCode}</p>
              </td>
            </tr>
          </div>
        </div>
        <div className="col col-lg-4 col-12 mt-2">
          <div className="form-field">
            <h4>Payment stage</h4>
          </div>
          <div className="form-field">
            <tr>
              <td style={{ paddingRight: "1rem" }}>
                <p style={{ fontWeight: 1000 }}>Stage No.</p>
              </td>
              <td style={{ paddingRight: "4rem" }}>
                <p>{project.noStage || "N/A"}</p>
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: "1rem" }}>
                <p style={{ fontWeight: 1000 }}>Stage name:</p>
              </td>
              <td style={{ paddingRight: "4rem" }}>
                <p>{project.currentStageId || "N/A"}</p>
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: "2rem" }}>
                <p style={{ fontWeight: 1000 }}>Tasks:</p>
              </td>
              <td className="d-flex">
                <div className="d-flex">
                  <Link
                    href={urls.project.id.tasks.getUri(params.id)}
                    className="theme-btn px-4 py-2"
                  >
                    View Tasks
                  </Link>
                </div>
              </td>
            </tr>
          </div>
        </div>
        <div className="col col-lg-8 col-12 mt-2">
          <div className="form-field">
            <h4>Pricing</h4>
          </div>
          <div className="form-field">
            <tr>
              <td style={{ paddingRight: "1rem" }}>
                <p style={{ fontWeight: 1000 }}>Estimated Price:</p>
              </td>
              <td style={{ paddingRight: "4rem" }}>
                <p>
                  {project.estimatedPrice?.toLocaleString(params.locale)} VND
                </p>
              </td>
            </tr>
            <tr>
              <td style={{ paddingRight: "1rem" }}>
                <p style={{ fontWeight: 1000 }}>Final Price:</p>
              </td>
              <td style={{ paddingRight: "4rem" }}>
                <p>
                  {project.finalPrice?.toLocaleString(params.locale) || "N/A"}
                </p>
              </td>
            </tr>
          </div>
        </div>
      </div>
    </div>
  );
}
