"use client";

import { useState, useEffect } from "react";
import { Link, useRouter } from "/navigation";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { CircularProgress, Stack, Tab, Tabs } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

import projectTaskStatusOptions from "/constants/enums/projectTaskStatus";

import { getProjectTasksByProjectId } from "/services/projectTaskServices";
import { getAllTaskCategories } from "/services/taskCategoryServices";
import { getFloorsByProjectId } from "/services/floorServices";
import { getPaymentStagesByProjectId } from "/services/paymentStageServices";

import Pagination from "/components/Shared/Pagination";
import Search from "/components/Shared/Search";
import NavButton from "/components/Shared/NavButton";
import { useTranslations } from "next-intl";

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected, &:hover": {
            color: "#CAAD06",
          },
        },
      },
    },
  },
});

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

export default function ProjectTasks() {
  // CONSTANTS
  const e = useTranslations("Error");
  const t = useTranslations("ProjectDetails_Task");
  const o = useTranslations("ProjectDetails_Overview");

  const viewModeQuery = "viewMode";
  const defaultViewMode = 0;

  const searchQuery = "search";

  const stageQuery = "stage";

  const floorQuery = "floor";

  const roomQuery = "room";

  const categoryQuery = "category";

  const statusQuery = "status";
  const statusAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // VIEWMODE (STAGE / FLOOR & ROOMS)
  const viewModeLabels = ["Switch to Stage view", "Switch to Floor/Room view"];
  const [viewMode, setViewMode] = useState(
    searchParams.get(viewModeQuery)
      ? parseInt(searchParams.get(viewModeQuery))
      : defaultViewMode
  );
  const onToggleViewMode = () => {
    setTasksLoading(true);
    const newViewMode = viewMode ? 0 : 1;
    setViewMode(newViewMode);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    newViewMode
      ? searchParams.set(viewModeQuery, newViewMode)
      : searchParams.delete(viewModeQuery);
    searchParams.delete(pageQuery);
    searchParams.delete(pageSizeQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), { scroll: false });
  };

  // STAGES
  const [stages, setStages] = useState([]);
  const [activeStage, setActiveStage] = useState(0);
  const fetchStages = async () => {
    const stages = await getPaymentStagesByProjectId({ projectId: params.id });
    setStages(stages.list);
    const active =
      stages.list.findIndex(
        (stage) => searchParams.get(stageQuery) === stage.id
      ) + 1;
    setActiveStage(active);
  };
  const handleStageChange = (event, newValue) => {
    setTasksLoading(true);
    setActiveStage(newValue);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    newValue
      ? searchParams.set(stageQuery, stages[newValue - 1]?.id)
      : searchParams.delete(stageQuery);
    searchParams.delete(pageQuery);
    searchParams.delete(pageSizeQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), { scroll: false });
  };

  // ROOMS
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(0);
  const handleRoomChange = (event, newValue) => {
    setTasksLoading(true);
    setActiveRoom(newValue);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set(roomQuery, rooms[newValue]?.id);
    searchParams.delete(pageQuery);
    searchParams.delete(pageSizeQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), { scroll: false });
  };

  // FLOORS
  const [floors, setFloors] = useState([]);
  const [activeFloor, setActiveFloor] = useState(0);
  const fetchFloors = async () => {
    const floors = await getFloorsByProjectId({ projectId: params.id });
    setFloors(floors.list);
    const active =
      floors.list.findIndex(
        (floor) => searchParams.get(floorQuery) === floor.id
      ) + 1;
    setRooms(active ? floors.list[active - 1].rooms : []);
    setActiveFloor(active);
  };
  const handleFloorChange = (event, newValue) => {
    setTasksLoading(true);
    setActiveFloor(newValue);
    setRooms(newValue ? floors[newValue - 1]?.rooms : []);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (newValue) {
      searchParams.set(floorQuery, floors[newValue - 1]?.id);
      setActiveRoom(0);
      searchParams.set(roomQuery, floors[newValue - 1]?.rooms[0]?.id);
    } else {
      searchParams.delete(floorQuery);
      searchParams.delete(roomQuery);
    }
    searchParams.delete(pageQuery);
    searchParams.delete(pageSizeQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), { scroll: false });
  };

  // TASKS
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchTasks = async () => {
    const projectId = params.id;
    const search = searchParams.get(searchQuery) ?? "";
    const categoryId = searchParams.get(categoryQuery) ?? "";
    const stageId = searchParams.get(stageQuery) ?? "";
    const roomId = searchParams.get(roomQuery) ?? "";
    const status = searchParams.get(statusQuery) ?? "";
    const page = searchParams.get(pageQuery) ?? defaultPage;
    const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

    const data = await getProjectTasksByProjectId({
      projectId,
      search,
      categoryId,
      status,
      ...(viewMode
        ? { roomId, includeRoomIdFilter: true }
        : { stageId, includeStageIdFilter: true }),
      page,
      pageSize,
    });
    setCount(data.totalPage);
    setTasks(data.list);
  };

  // CATEGORIES
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const data = await await getAllTaskCategories({});
      setCategories(data.list);
    } catch (error) {
      toast.error(e("TaskCategoryError"));
    }
  };

  const fetchOptionsFromApi = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchCategories(), fetchStages(), fetchFloors()]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(e("FetchError"));
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFromApi = async () => {
    setTasksLoading(true);
    try {
      await fetchTasks();
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(e("FetchError"));
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  useEffect(() => {
    setViewMode(
      searchParams.get(viewModeQuery)
        ? parseInt(searchParams.get(viewModeQuery))
        : defaultViewMode
    );
    setActiveStage(
      stages.findIndex((stage) => searchParams.get(stageQuery) === stage.id) + 1
    );
    const active =
      floors.findIndex((floor) => searchParams.get(floorQuery) === floor.id) +
      1;
    setRooms(active ? floors[active - 1].rooms : []);
    setActiveFloor(active);
    fetchDataFromApi();
  }, [searchParams]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <NavButton url={`/project/${params.id}`} label={o("Overview")}></NavButton>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <div className="d-flex justify-content-between">
            <h3 className="my-auto">{t("Tasks")}</h3>
            <div className="d-flex">
              <button
                disabled={tasksLoading}
                className="theme-btn py-0 px-4"
                onClick={onToggleViewMode}
              >
                {viewModeLabels[viewMode]}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder={t("SearchTasks")}></Search>
        </div>
        <div className="col col-lg-6 col-12 wpo-contact-pg-section">
          <form>
            <div className="wpo-contact-form-area-transparent m-0 row">
              <div className="col col-lg-6 col-12">
                <div className="form-field shadow-sm">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2 "
                    style={{ backgroundColor: "white", height: "55px" }}
                  >
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col col-lg-6 col-12">
                <div className="form-field shadow-sm">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2"
                    style={{ backgroundColor: "white", height: "55px" }}
                  >
                    {projectTaskStatusOptions.map((status, index) => (
                      <option key={status} value={index}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-12 col-12">
          <ThemeProvider theme={theme}>
            {viewMode === 0 ? (
              <Tabs
                value={activeStage}
                onChange={handleStageChange}
                TabIndicatorProps={{ style: { backgroundColor: "#CAAD06" } }}
              >
                <Tab label={<span>{t("No")}</span>} />
                {stages.map((stage) => (
                  <Tab key={stage.id} label={<span>{stage.name}</span>} />
                ))}
              </Tabs>
            ) : (
              <Tabs
                value={activeFloor}
                onChange={handleFloorChange}
                TabIndicatorProps={{ style: { backgroundColor: "#CAAD06" } }}
              >
                <Tab label={<span>{t("NonArchitect")}</span>} />
                {floors.map((floor) => (
                  <Tab key={floor.id} label={<span>{floor.usePurpose}</span>} />
                ))}
              </Tabs>
            )}
          </ThemeProvider>
        </div>
        <div className="col col-lg-12 col-12">
          <div className="row">
            <div
              className={`col col-12 ${
                viewMode === 1 && rooms && rooms.length > 0 ? "col-lg-2" : ""
              }`}
            >
              <ThemeProvider theme={theme}>
                {viewMode === 1 && rooms && rooms.length > 0 && (
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    sx={{
                      minWidth: "8rem",
                      ".MuiTabs-indicator": {
                        backgroundColor: "#CAAD06",
                        left: 0,
                      },
                    }}
                    value={activeRoom}
                    onChange={handleRoomChange}
                  >
                    {rooms.map((room) => (
                      <Tab key={room.id} label={room.usePurpose} />
                    ))}
                  </Tabs>
                )}
              </ThemeProvider>
            </div>
            <div
              className={`col col-12 ${
                viewMode === 1 && rooms && rooms.length > 0
                  ? "col-lg-10"
                  : "col-lg-12"
              }`}
              style={{ minHeight: "30rem" }}
            >
              {tasksLoading ? (
                <Stack sx={{ height: "100%" }}>
                  <CircularProgress
                    sx={{ m: "auto", color: "#CAAD06" }}
                    size="3rem"
                  ></CircularProgress>
                </Stack>
              ) : tasks && tasks.length > 0 ? (
                <table className="table table-striped table-hover">
                  <thead
                    className="shadow-sm"
                    style={{ position: "sticky", top: 0, zIndex: 1 }}
                  >
                    <tr>
                      <th scope="col" width="22.5%">
                      {t("Name")}
                      </th>
                      <th scope="col" width="12.5%">
                      {t("Category")}
                      </th>
                      <th scope="col" width="12.5%">
                      {t("Price")} (VND)
                      </th>
                      <th scope="col" width="12.5%">
                      {t("StartDate")}
                      </th>
                      <th scope="col" width="17.5%">
                      {t("Progress")}
                      </th>
                      <th
                        scope="col"
                        width="12.5%"
                        style={{ textAlign: "center" }}
                      >
                        {t("Status")}
                      </th>
                      <th scope="col" width="10%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td className="align-middle py-4">
                          <h6 style={{ fontWeight: 600, margin: 0 }}>
                            {task && task.code}
                          </h6>
                          <p style={{ margin: 0 }}>{task && task.name}</p>
                        </td>
                        <td className="align-middle">
                          {task.taskCategory?.name || t("Unclassified")}
                        </td>
                        <td className="align-middle">
                          {task &&
                            (task.unitUsed > task.unitInContract
                              ? task.pricePerUnit * task.unitUsed
                              : task.pricePerUnit * task.unitInContract
                            ).toLocaleString(params.locale)}{" "}
                        </td>
                        <td className="align-middle">
                          {task.startDate
                            ? moment(task.startDate).format("L")
                            : t("Undefined")}
                        </td>
                        <td
                          className="align-middle"
                          style={{ position: "relative" }}
                        >
                          <BorderLinearProgress
                            variant="determinate"
                            value={task && task.percentage}
                          ></BorderLinearProgress>
                          <p
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              fontWeight: 600,
                              color: "white",
                            }}
                          >
                            {task.percentage}%
                          </p>
                        </td>
                        <td className="align-middle text-center">
                          {projectTaskStatusOptions[task.status]}
                        </td>
                        <td className="align-middle m-0">
                          <div className="d-flex justify-content-end">
                            <Link
                              href={`/project/${params.id}/tasks/${task.id}`}
                              className="theme-btn m-1 py-2"
                              style={{ zIndex: 0 }}
                            >
                              {t("Details")}
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Stack sx={{ height: "100%" }}>
                  <p style={{ margin: "auto", textAlign: "center" }}>
                  {t("NoData")}.
                  </p>
                </Stack>
              )}
            </div>
          </div>

          <Pagination count={count}></Pagination>
        </div>
      </div>
    </div>
  );
}
