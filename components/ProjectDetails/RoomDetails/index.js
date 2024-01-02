"use client";

import { Link } from "/navigation";
import OverviewBreadcrumb from "./Breadcrumb";
import { getRoomById } from "/services/roomServices";
import SuggestionModal from "./SuggestionModal";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

export default function RoomDetails() {
  const params = useParams();
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getRoomById(params.roomId);
          setRoom(data);
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
            <OverviewBreadcrumb
              id={params.id}
              siteId={params.siteId}
              floorId={params.floorId}
              roomId={room.id}
            ></OverviewBreadcrumb>
          </div>
          <div className="col col-lg-12 col-12">
            <div className="form-field">
              <h2>Room: {room.usePurpose}</h2>
            </div>
          </div>
          <div className="col col-lg-12 col-12 mt-4">
            <div className="col col-lg-12 col-12">
              <table>
                <tbody>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Area:</p>
                    </td>
                    <td>
                      <p>
                        {room.area} m<sup>2</sup>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Price:</p>
                    </td>
                    <td>
                      <p>
                        {(room.pricePerArea * room.area).toLocaleString(
                          params.locale
                        )}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Description:</p>
                    </td>
                    <td>
                      <p>{room.description}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Tasks:</p>
                    </td>
                    <td className="d-flex">
                      <div className="d-flex">
                        <Link
                          href={`/project/1/tasks`}
                          className="theme-btn px-4 py-2"
                        >
                          View Tasks
                        </Link>
                      </div>
                      <div className="d-flex mx-4">
                        <SuggestionModal>Add Suggestion</SuggestionModal>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
