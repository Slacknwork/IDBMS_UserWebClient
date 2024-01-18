"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CircularProgress, Stack } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { FaPlus } from "react-icons/fa";
import { useTranslations } from "next-intl";

import {
  getCommentsByProjectTaskId,
  createComment,
} from "/services/commentServices";

import "./style.css";
import { toast } from "react-toastify";

const dropzoneStyles = {
  border: "2px dashed #2980b9",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  marginTop: "20px",
};

export default function TaskCommentsPage() {
  // CONSTANTS
  const searchQuery = "search";
  const typeQuery = "type";
  const statusQuery = "status";
  const pageQuery = "page";

  const defaultPage = 1;
  const defaultPageSize = 5;

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.customer);
  const t = useTranslations("ProjectDetails_Comment");
  const e = useTranslations("Error");

  const [comment, setComment] = useState("");
  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleFileChange = (file) => {
    setSelectedFile(file);
    setIsModalOpen(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      handleFileChange(file);
    },
  });

  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const handleOpenConfirmModal = () => {
    setIsModalConfirmOpen(true);
  };
  const handleCloseConfirmModal = () => {
    setIsModalConfirmOpen(false);
  };

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const taskId = params.taskId;
      const projectId = params.id;
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = defaultPageSize;

      const comments = await getCommentsByProjectTaskId({
        taskId,
        projectId,
        page,
        pageSize,
      });
      setComments(comments.list);
    } catch (error) {
      toast.error(e("ErrorComment"));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchComments()]);
    setLoading(false);
  };

  // SUBMIT
  const handleSubmitComment = async () => {
    try {
      await createComment(params.id, {
        projectTaskId: params.taskId,
        projectId: params.id,
        userId: user.id,
        type: 0,
        content: comment,
        file: selectedFile,
      });
      toast.success(t("CreatedCommentSuccessfully"));
      await fetchData();
    } catch (error) {
      toast.error(e("ErrorComment"));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <div className="review">
            <div className="add-review-sec">
              <h3 style={{ fontSize: 24 }}>{t("AddComment")}</h3>
              <div className="form-field">
                <textarea
                  style={{ color: "black", height: "8rem" }}
                  name="comment"
                  value={comment}
                  onChange={onCommentChange}
                  placeholder={t("YourComment")}
                ></textarea>
              </div>
              <div className="form-submit d-flex justify-content-end">
                <div className="d-flex">
                  <button
                    type="submit"
                    className="theme-btn px-4 py-2"
                    onClick={handleOpenConfirmModal}
                  >
                    {t("Submit")}
                  </button>
                  <Modal
                    isOpen={isModalConfirmOpen}
                    toggle={handleCloseConfirmModal}
                    centered
                  >
                    <ModalHeader toggle={handleCloseConfirmModal}>
                    {t("ConfirmSubmission")}
                    </ModalHeader>
                    <ModalBody>
                      <p>{t("AreYouSure")}</p>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="theme-btn-s2 px-4 py-2"
                        onClick={handleCloseConfirmModal}
                      >
                        {t("Cancel")}
                      </button>
                      <div className="d-flex">
                        <button
                          className="theme-btn px-4 py-2 rounded-0"
                          onClick={handleSubmitComment}
                        >
                          {t("Submit")}
                        </button>
                      </div>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="review-section mt-4" style={{ minHeight: "30rem" }}>
              <h3>{t("Comment")}</h3>
              {loading ? (
                <Stack sx={{ height: "30rem" }}>
                  <CircularProgress
                    sx={{ m: "auto", color: "#CAAD06" }}
                    size="4rem"
                  ></CircularProgress>
                </Stack>
              ) : comments && comments.length > 0 ? (
                <ul>
                  <li>
                    <div className="review-content">
                      <div className="reviewer-say">
                        <h3>
                          Cobus Besten <span>June 7’2022</span>
                        </h3>
                        <p>
                          Lorem is simply dummy text of the printing and
                          typesetting industry. Lorem has been the industry's.
                        </p>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div className="review-content">
                          <div className="reviewer-say">
                            <h3>
                              James Koster <span>June 7 2022</span>
                            </h3>
                            <p>
                              Lorem is simply dummy text of the printing and
                              typesetting industry. Lorem has been the
                              industry's.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              ) : (
                <Stack sx={{ height: "30rem" }}>
                  <p style={{ margin: "auto", textAlign: "center" }}>
                  {t("NoComment")}
                  </p>
                </Stack>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
