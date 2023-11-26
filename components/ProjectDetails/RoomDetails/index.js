"use client";

import { Link } from "/navigation";
import OverviewBreadcrumb from "../Overview/Breadcrumb";
import { getRoomById } from "../../../api/RoomServices";
import SuggestionModal from "./SuggestionModal";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function RoomDetails() {

  const [item, setItem] = useState([]);
  const [roomId, setRoomId] = useState("15FD268A-85B9-45D3-9DB2-6E12F9ECF43A");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getRoomById(roomId);
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
  }, [roomId]);

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12">
            <OverviewBreadcrumb
              id={1}
              siteId={1}
              floorId={1}
              roomId={1}
            ></OverviewBreadcrumb>
          </div>
          <div className="col col-lg-3 col-12">
            <h3>Room Information</h3>
          </div>
          <div className="col col-lg-3 col-12">
            <div className="form-field">
              <label className="mb-1">Room Name</label>
              <input type="text" name="name" placeholder="Your Name" value={item.usePurpose} />
            </div>
          </div>
          <div className="col col-lg-3 col-12">
            <div className="form-field">
              <label className="mb-1">Use purpose</label>
              <input type="text" name="name" placeholder="Use purpose" value={item.usePurpose} />
            </div>
          </div>
          <div className="col col-lg-3 col-12">
            <div className="form-field">
              <label className="mb-1">Room Type</label>
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
              <label className="mb-1">Room Description</label>
              <textarea
                type="text"
                name="message"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="row">
              <div className="col col-lg-6 col-12">
                <div className="form-field">
                  <label className="mb-1">Area</label>
                  <input
                    type="text"
                    name="message"
                    placeholder="Message"
                  ></input>
                </div>
              </div>
              <div className="col col-lg-6 col-12">
                <div className="form-field">
                  <label className="mb-1">Price</label>
                  <input
                    type="text"
                    name="message"
                    placeholder="Message"
                  ></input>
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
              <div className="d-flex gap-15 justify-content-center align-items-center mt-2">
                <div className="d-flex">
                  <SuggestionModal>Add suggestion</SuggestionModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
