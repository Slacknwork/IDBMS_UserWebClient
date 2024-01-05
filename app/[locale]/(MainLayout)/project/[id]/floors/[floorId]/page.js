"use client";

import { useState, useEffect } from "react";
import { Link } from "/navigation";
import { CircularProgress, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";

import { getFloorById } from "/services/floorServices";
import { getRoomsByFloorId } from "/services/roomServices";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";

export default function FloorDetails() {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";
  const defaultPage = 1;
  const defaultPageSize = 5;

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [floor, setFloor] = useState({});
  const [rooms, setRooms] = useState([]);
  const [count, setCount] = useState(0);

  const fetchFloor = async () => {
    try {
      const floor = await getFloorById({
        floorId: params.floorId,
        projectId: params.id,
      });
      setFloor(floor);
    } catch (error) {
      toast.error("Error: Floor Details");
    }
  };

  const fetchRooms = async () => {
    try {
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = defaultPageSize;

      const rooms = await getRoomsByFloorId({
        floorId: params.floorId,
        projectId: params.id,
        search,
        page,
        pageSize,
      });
      setRooms(rooms.list);
      setCount(rooms.totalPage);
    } catch (error) {
      toast.error("Error: Rooms");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchFloor(), fetchRooms()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <div className="pb-0 container">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="wpo-breadcumb-wrap">
              <ol>
                <li>
                  <Link href={`/project`}>{`Project`}</Link>
                </li>
                <li>
                  <Link href={`/project/${params.id}/floors`}>{`Floor`}</Link>
                </li>
              </ol>
            </div>
          </div>
          <div className="col col-lg-12 col-12">
            <div className="form-field">
              <h3>
                Floor {floor.floorNo == 0 ? "G" : floor.floorNo}
                {` - ${floor.usePurpose}`}
              </h3>
            </div>
          </div>
          <div className="col col-lg-12 col-12">
            <p>{floor.description || "No description."}</p>
          </div>
        </div>
        <div className="row my-4">
          <h3 className="my-auto">Rooms</h3>
        </div>
        <div className="row">
          <div className="col col-lg-6 mb-4">
            <Search placeholder="Search Rooms"></Search>
          </div>
          <div className="col col-lg-12 col-12">
            <div style={{ height: "25rem" }}>
              {loading ? (
                <Stack sx={{ height: "100%" }}>
                  <CircularProgress
                    sx={{ m: "auto", color: "#CAAD06" }}
                    size="3rem"
                  ></CircularProgress>
                </Stack>
              ) : (
                <table
                  className="table table-striped table-hover"
                  style={{ overflowY: "scroll" }}
                >
                  <thead
                    className="shadow-sm"
                    style={{ position: "sticky", top: 0, zIndex: 1 }}
                  >
                    <tr>
                      <th scope="col" style={{ width: "6rem" }}>
                        No.
                      </th>
                      <th scope="col">Use Purpose</th>
                      <th scope="col">Description</th>
                      <th scope="col">Area</th>
                      <th scope="col">Room Type</th>
                      <th scope="col">Total Price</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms &&
                      rooms.length > 0 &&
                      rooms.map((room, index) => (
                        <tr key={room.id}>
                          <th
                            scope="row"
                            className="align-middle"
                            style={{ textAlign: "center" }}
                          >
                            {index}
                          </th>
                          <td className="align-middle">
                            {room && room.usePurpose}
                          </td>
                          <td className="align-middle">
                            {room && room.description}
                          </td>
                          <td className="align-middle">
                            {room && room.area} m<sup>2</sup>
                          </td>
                          <td className="align-middle">
                            {room && room.roomType?.name}
                          </td>
                          <td className="align-middle">
                            {room &&
                              (room.area * room.pricePerArea).toLocaleString(
                                params.locale
                              )}{" "}
                            VND
                          </td>
                          <td className="align-middle m-0">
                            <div className="d-flex justify-content-end">
                              <Link
                                href={""}
                                className="theme-btn m-1 px-2 py-2"
                              >
                                Tasks
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="col col-12 col-lg-12">
              <Pagination count={count}></Pagination>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
