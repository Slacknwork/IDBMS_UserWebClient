"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import {
  getProjectParticipationInProjectByUserView,
  createParticipationByEmail,
} from "/services/projectParticipationServices";
import participationRole from "/constants/enums/participationRole";

import NavButton from "/components/Shared/NavButton";

const EmailModal = ({ isOpen, toggle, success }) => {
  const params = useParams();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the email submission logic here
    try {
      await createParticipationByEmail(email, params.id);
      toast.success("Tạo thành công!");
      typeof success === "function" && success();
    } catch (error) {
      toast.error("Tạo thất bại!");
    }
    // Close the modal
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thêm người xem</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Nhập email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Nhập email..."
              value={email}
              onChange={handleEmailChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" onClick={handleSubmit}>
          Thêm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default function ParticipationsPage() {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";

  const defaultPage = 1;
  const defaultPageSize = 5;
  const pageSizeQuery = "size";

  // INIT
  const o = useTranslations("ProjectDetails_Overview");
  const t = useTranslations("ProjectDetails_Participation");
  const e = useTranslations("Error");
  const params = useParams();
  const searchParams = useSearchParams();
  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
      ? "vietnamese"
      : "";

  // PARTICIPATIONS
  const [participations, setParticipations] = useState([]);
  const [projectOwner, setProjectOwner] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    setLoading(true);
    const fetchParticipations = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;

      try {
        const response = await getProjectParticipationInProjectByUserView({
          projectId,
          search,
          page,
        });

        setParticipations(response?.customerViewers?.list ?? []);
        setCount(response?.customerViewers?.totalPage ?? 0);

        setProjectOwner(response?.productOwner ?? []);
        setProjectManager(response?.projectManager ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(e("FetchParticipationError"));
      }
    };
    await Promise.all([fetchParticipations()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="container" style={{ minHeight: "40rem" }}>
      <div className="row">
        <div className="col col-lg-12 col-12">
          <NavButton
            url={`/project/${params.id}`}
            label={o("Overview")}
          ></NavButton>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <div className="d-flex justify-content-between">
            <h3 className="my-auto">{t("Participants")}</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder={t("SearchName")}></Search>
        </div>
        <div className="col offset-4 col-lg-2 col-12 mb-4">
          <button className="theme-btn" onClick={toggleModal}>
            Add viewer
          </button>
          <EmailModal
            success={fetchDataFromApi}
            isOpen={isModalOpen}
            toggle={toggleModal}
          />
        </div>
      </div>

      {/* <Grid item xs={12} lg={6}>
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
              {t("ProjectManager")}
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              <UserCard
                name={projectManager?.user?.name || "Không tìm thấy"}
                email={projectManager?.user?.email || "..."}
                phone={projectManager?.user?.phone || "..."}
              ></UserCard>
            </Box>
          </Box>
        </Card>
      </Grid> */}

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
              <th scope="col">{t("Name")}</th>
              <th scope="col">{t("Role")}</th>
              {/* <th scope="col" style={{ width: "10rem" }}>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {participations &&
              participations.map((participation) => (
                <tr key={participation.id}>
                  <td className="align-middle">{participation?.user?.name}</td>
                  <td className="align-middle">
                    <Chip label={participationRole[participation.role]}></Chip>
                  </td>
                  {/* <td className="align-middle">{t("Delete")}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Pagination count={count}></Pagination>
    </div>
  );
}
