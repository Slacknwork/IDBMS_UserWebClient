import React from "react";
import { Link } from "/navigation";

import urls from "/constants/urls";

import Pagination from "/components/Pagination";
import { getProjectTasksByProjectId } from "../../../api/projectTaskServices";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const TaskTableItem = (task) => {
  const TaskHref = urls.project.id.tasks.taskId.getUri(1, 1);
  console.log(task);
  const item = task.task;

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "right" }}>
        1
      </th>
      <td className="align-middle">{item && item.name}</td>
      <td className="align-middle" style={{ whiteSpace: 'pre-line' }}>
        {item && item.room && `-${item.room.usePurpose} \n -Tầng ${item.room.floor.floorNo} \n -${item.room.floor.site.name}`}
      </td>
      <td className="align-middle">{item && item.taskCategory?.name}</td>
      <td className="align-middle">
        {item && (item.unitUsed > item.unitInContract ? item.pricePerUnit * item.unitUsed : item.pricePerUnit * item.unitInContract)}
      </td>
      <td className="align-middle">{item && item.status}</td>
      <td className="align-middle m-0">
        <div className="d-flex">
          <Link
            href={TaskHref}
            className="theme-btn m-1"
            style={{ width: "6rem", zIndex: 0 }}
          >
            Details
          </Link>
          <Link
            href={TaskHref}
            className="theme-btn m-1"
            style={{ width: "6rem", zIndex: 0 }}
          >
            Comments
          </Link>
        </div>
      </td>
    </tr>
  );
};

const TaskTable = (listTask) => {
  console.log(listTask)
  const values = listTask.listTask;
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
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Category</th>
            <th scope="col">Price (VND)</th>
            <th scope="col">Status</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((item, index) => (
              <TaskTableItem key={index} task={item} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function ProjectTasks() {

  const [values, setValues] = useState([]);
  const [projectId, setProjectId] = useState("FF090F51-E6E7-4854-8F3F-0402EE32C9F8");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectTasksByProjectId(projectId);
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
        <div className="col col-lg-6 col-12">
          <div className="blog-sidebar">
            <div className="widget search-widget">
              <form>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Task Name..."
                  />
                  <button type="submit">
                    <i className="ti-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col col-lg-6 col-12">
          <div className="wpo-contact-pg-section">
            <form>
              <div className="wpo-contact-form-area-transparent row">
                <div className="col col-lg-6 col-12">
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
                <div className="col col-lg-6 col-12">
                  <div className="form-field">
                    <select
                      type="text"
                      name="subject"
                      className="rounded-2"
                      style={{ backgroundColor: "white", height: "55px" }}
                    >
                      <option>Status</option>
                      <option>Architecture</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-12 col-12">
          {values && (<TaskTable listTask={values} />)}
          <Pagination
            path={`tasks`}
            sectionId={urls.id.PROJECT_SECTION}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
