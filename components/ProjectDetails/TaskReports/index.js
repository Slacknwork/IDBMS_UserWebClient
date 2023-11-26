import { FaTrash } from "react-icons/fa";
import { getTaskReportsByProjectTaskId } from "../../../api/taskReportServices";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";


const TaskReportTableItem = (object) => {
  const item = object.item;
  const no = object.index;
  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "center" }}>
        {no}
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

const TaskReportTable = (reportList) => {
  console.log(reportList)
  const values = reportList.reportList;
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
          {values &&
            values.map((item, index) => (
              <TaskReportTableItem key={index} item={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function TaskReportDetails() {

  const [values, setValues] = useState([]);
  const [taskId, setTaskId] = useState("CEEA4FE0-9052-4C2F-B18C-03C222032E54");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getTaskReportsByProjectTaskId(taskId);
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
  }, [taskId]);

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12">
            <TaskReportTable reportList={values} />
          </div>
        </div>
      </form>
    </div>
  );
}
