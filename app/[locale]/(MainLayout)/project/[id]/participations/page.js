"use client";

import { useEffect, useState } from "react";
import { Link } from "/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Box, Card, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";


import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import { getProjectParticipationInProjectByUserView } from "/services/projectParticipationServices";

export default function ParticipationsPage() {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";

  const defaultPage = 1;
  const defaultPageSize = 5;
  const pageSizeQuery = "size";

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();
  const language = params?.locale === "en-US" ? "english" : params?.locale === "vi-VN" ? "vietnamese" : "";

  // PARTICIPATIONS
  const [participations, setParticipations] = useState([]);
  const [projectOwner, setProjectOwner] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchParticipations = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) || "";
      const page = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getProjectParticipationInProjectByUserView({
          projectId,
          search,
          page,
          pageSize
        });
        console.log(response);

        setParticipations(response?.customerViewers?.list ?? []);
        setCount(response?.customerViewers?.totalPage ?? 0);

        setProjectOwner(response?.productOwner ?? []);
        setProjectManager(response?.projectManager ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thành viên' từ hệ thống");
      }
    };
    await Promise.all([fetchParticipations()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);


  return (
    <div
      style={{
        minHeight: "35rem",
      }}
    >
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder="Search by Name..."></Search>
        </div>
      </div>

      <Grid item xs={12} lg={6}>
        <Card
          variant="outlined"
          sx={{
            p: 3,
            border: 1,
            borderColor: "gray",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ my: "auto" }}>
              Quản lý dự án
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              {/* <UserCard
                name={projectManager?.user?.name || "Không tìm thấy"}
                email={projectManager?.user?.email || "..."}
                phone={projectManager?.user?.phone || "..."}
              ></UserCard> */}
            </Box>
          </Box>
        </Card>
      </Grid>

      {loading ? (
        <Stack sx={{ height: "30rem" }}>
          <CircularProgress
            sx={{ m: "auto", color: "#CAAD06" }}
            size="3rem"
          ></CircularProgress>
        </Stack>
      ) : (
        <table className="table table-striped table-hover">
          <thead
            className="shadow-sm"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col" style={{ width: "10rem" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {participations &&
              participations.map((participation) => (
                <tr key={participation.id}>
                  <td className="align-middle">
                    {
                      participation?.user?.name
                    }
                  </td>
                  <td className="align-middle">
                    {
                      participation?.role
                    }
                  </td>
                  <td className="align-middle"> xóa</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Pagination count={count}></Pagination>
    </div>
  );
}
