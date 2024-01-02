import { FaTrash } from "react-icons/fa";
import { getTaskReportsByProjectTaskId } from "/services/taskReportServices";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

const TaskReportTableItem = ({ item, index }) => {
  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "center" }}>
        {index}
      </th>
      <td className="align-middle">{item && item.name}</td>
      <td className="align-middle">{item && item.description}</td>
      <td className="align-middle">{item && item.unitUsed}</td>
      <td className="align-middle">{item && item.calculationUnit}</td>
      <td className="align-middle">
        {item && new Date(item.createdTime).toLocaleDateString("en-GB")}
      </td>
      <td className="align-middle m-0">
        <div className="d-flex">
          <button
            type="button"
            className="theme-btn m-1"
            style={{ width: "6rem", zIndex: 0 }}
          >
            Details
          </button>
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

const TaskReportTable = ({ reportList }) => {
  console.log(reportList);
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
            <th scope="col" style={{ width: "6rem", textAlign: "center" }}>
              No.
            </th>
            <th scope="col">Task Report Name</th>
            <th scope="col">Description</th>
            <th scope="col">Unit Used</th>
            <th scope="col">Calculation Unit</th>
            <th scope="col">Created Time</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reportList &&
            reportList.map((item, index) => (
              <TaskReportTableItem
                key={item.id}
                item={item}
                index={index + 1}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function TaskReportDetails() {
  const params = useParams();
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getTaskReportsByProjectTaskId(params.taskId);
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
    <div className="pb-0 container">
      {values && values.length > 0 ? (
        <form className="contact-validation-active">
          <div className="row">
            <div className="col col-lg-12 col-12">
              <TaskReportTable reportList={values} />
            </div>
          </div>
        </form>
      ) : (
        <div
          style={{
            marginTop: "2rem",
            height: "5rem",
          }}
        >
          <p>This task currently has no reports.</p>
        </div>
      )}
    </div>
  );
}
