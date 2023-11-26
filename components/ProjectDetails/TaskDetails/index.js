import { useEffect, useRef, useState } from "react";
import { getProjectTaskById } from "../../../api/projectTaskServices";
import { toast } from "react-toastify";

export default function TaskDetails() {

  const [item, setItem] = useState([]);
  const [taskId, setTaskId] = useState("CEEA4FE0-9052-4C2F-B18C-03C222032E54");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectTaskById(taskId);
          console.log(data);
          setItem(data);
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
          <div className="col col-lg-3 col-12">
            <h3>Task Information</h3>
          </div>
          <div className="col col-lg-3 col-12">
            <div className="form-field">
              <label className="mb-1">Task Name</label>
              <input type="text" name="name" placeholder="Your Name" value={item.name} />
            </div>
          </div>
          <div className="col col-lg-3 col-12">
            <div className="form-field">
              <label className="mb-1">Use purpose</label>
              <input type="text" name="name" placeholder="Use purpose" />
            </div>
          </div>
          <div className="col col-lg-3 col-12">
            <div className="form-field">
              <label className="mb-1">Task Type</label>
              <select type="text" name="subject">
                <option>Service</option>
                <option>Architecture</option>
                <option>The Rehearsal Dinner</option>
                <option>The Afterparty</option>
                <option>Videographers</option>
                <option>Perfect Cake</option>
                <option>All Of The Above</option>
              </select>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Task Description</label>
              <textarea
                type="text"
                name="message"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Progress</label>
              <input type="text" name="name" placeholder="Your Name" />
            </div>
            <div className="form-field">
              <label className="mb-1">Price</label>
              <input type="text" name="name" placeholder="Your Name" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
