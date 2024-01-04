import { useState, useEffect } from "react";
import { Link } from "/navigation";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import { CircularProgress, Stack } from "@mui/material";

import { getFloorsByProjectId } from "/services/floorServices";
import { getProjectById } from "/services/projectServices";

import Search from "/components/Shared/Search";

export default function FloorList() {
  // CONSTANTS
  const searchQuery = "search";

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [floors, setFloors] = useState([]);
  const [project, setProject] = useState({});

  const fetchFloors = async () => {
    try {
      const search = searchParams.get(searchQuery) ?? "";
      const floors = await getFloorsByProjectId({
        projectId: params.id,
        search,
      });
      setFloors(floors.list);
    } catch (error) {
      toast.error("Error: Floors");
    }
  };

  const fetchProject = async () => {
    try {
      const project = await getProjectById(params.id);
      setProject(project);
    } catch (error) {
      toast.error("Error: Project");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchFloors(), fetchProject()]);
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
                <Link href={`/project/${params.id}`}>
                  {project.name || `Project`}
                </Link>
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
              style={{
                overflowY: "scroll",
              }}
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
                      <td className="align-middle">{floor.usePurpose}</td>
                      <td className="align-middle">{floor.description}</td>
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
      </div>
    </div>
  );
}
