import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getCommentsByProjectId } from "../../../api/commentServices";

const CommentTableItem = (comment) => {
  console.log(comment);
  const item = comment.comment;
  const no = comment.index;
  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "right" }}>
        {no}
      </th>
      <td className="align-middle">{item && item.content}</td>
      <td className="align-middle">{item && item.projectTask?.name}</td>
      <td className="align-middle">{item && new Date(item.createdTime).toLocaleDateString("en-GB")}</td>
      <td className="align-middle">{item && item.user?.name}</td>
    </tr>
  );
};

const CommentTable = (listComment) => {
  console.log(listComment)
  const values = listComment.listComment;
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
            <th scope="col">Content</th>
            <th scope="col">Task</th>
            <th scope="col">Created Date</th>
            <th scope="col">From</th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((item, index) => (
              <CommentTableItem key={index} comment={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Comments() {

  const [values, setValues] = useState([]);
  const [projectId, setProjectId] = useState("ff090f51-e6e7-4854-8f3f-0402ee32c9f8");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getCommentsByProjectId(projectId);
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
        <div className="col col-lg-12 col-12">
          {values && (<CommentTable listComment={values} />)}
        </div>
      </div>
    </div>
  );
}
