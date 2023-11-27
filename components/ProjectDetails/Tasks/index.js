import React, { useRef, useState, useEffect } from "react";
import { Link } from "/navigation";

import urls from "/constants/urls";

import Pagination from "/components/Pagination";
import { getProjectTasksByProjectId } from "/api/projectTaskServices";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#f6e166",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: "#caad06",
  },
}));

const TaskTableItem = ({ task, index }) => {
  const params = useParams();
  const TaskHref = urls.project.id.tasks.taskId.getUri(params.id, task.id);
  return (
    <tr>
      <th scope="row" className="align-middle text-center">
        {index}
      </th>
      <td className="align-middle">{task && task.name}</td>
      <td className="align-middle" style={{ whiteSpace: "pre-line" }}>
        {task &&
          task.room &&
          `${task.room.usePurpose} \n Tầng ${task.room.floor.floorNo} \n ${task.room.floor.site.name}`}
      </td>
      <td className="align-middle">{task && task.taskCategory?.name}</td>
      <td className="align-middle">
        {task &&
          (task.unitUsed > task.unitInContract
            ? task.pricePerUnit * task.unitUsed
            : task.pricePerUnit * task.unitInContract)}
      </td>
      <td className="align-middle">
        <BorderLinearProgress
          variant="determinate"
          value={task && task.percentage}
        ></BorderLinearProgress>
      </td>
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
            <th scope="col" style={{ width: "15rem" }}>
              Status
            </th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((item, index) => (
              <TaskTableItem key={item.id} task={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function ProjectTasks() {
  const params = useParams();
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectTasksByProjectId(params.id);
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
  });

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
          {values && <TaskTable listTask={values} />}
          <Pagination
            path={`tasks`}
            sectionId={urls.id.PROJECT_SECTION}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
