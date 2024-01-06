"use client";

import { useState, useEffect } from "react";
import { Link } from "/navigation";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import { CircularProgress, Stack } from "@mui/material";

import { getFloorsByProjectId } from "/services/floorServices";
import { getProjectById } from "/services/projectServices";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";

export default function FloorList() {
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
  const [floors, setFloors] = useState([]);
  const [count, setCount] = useState(0);

  const fetchFloors = async () => {
    try {
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = defaultPageSize;

      const floors = await getFloorsByProjectId({
        projectId: params.id,
        search,
        page,
        pageSize,
      });
      setFloors(floors.list);
      setCount(floors.totalPage);
    } catch (error) {
      toast.error("Error: Floors");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchFloors()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <div className="pb-0 container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <div className="wpo-breadcumb-wrap">
            <ol>
              <li>
                <Link href={`/project/${params.id}/floors`}>{`Floors`}</Link>
              </li>
            </ol>
          </div>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <div className="d-flex justify-content-between">
            <h3 className="my-auto">Floors</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <Search placeholder="Search Floor"></Search>
        </div>
        <div className="col col-lg-12 col-12" style={{ height: "25rem" }}>
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
                  <th width="7.5%" scope="col" style={{ width: "5rem" }}>
                    Floor
                  </th>
                  <th width="40%" scope="col">
                    Use Purpose
                  </th>
                  <th width="45%" scope="col">
                    Description
                  </th>
                  <th width="7.5%" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {floors &&
                  floors.length > 0 &&
                  floors.map((floor) => (
                    <tr key={floor.id}>
                      <th
                        scope="row"
                        className="align-middle"
                        style={{ textAlign: "center" }}
                      >
                        {floor.floorNo == 0 ? "G" : floor.floorNo}
                      </th>
                      <td className="align-middle">
                        {floor.usePurpose || "N/A"}
                      </td>
                      <td className="align-middle">
                        {floor.description || "N/A"}
                      </td>
                      <td className="align-middle m-0">
                        <div className="d-flex justify-content-end">
                          <Link
                            href={`/project/${params.id}/floors/${floor.id}`}
                            className="theme-btn m-1 py-2"
                          >
                            Details
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
  );
}
