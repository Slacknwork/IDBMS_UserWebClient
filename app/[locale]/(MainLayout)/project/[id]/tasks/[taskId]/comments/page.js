"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Avatar, CircularProgress, Stack } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { FaPlus } from "react-icons/fa";
import { useTranslations } from "next-intl";
import moment from "moment-timezone";
import "moment/locale/vi";

import timezone from "/constants/timezone";

import {
  getCommentsByProjectTaskId,
  createComment,
} from "/services/commentServices";

import { getColorForAvatar, getAvatarContent } from "/utils/avatar";

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
  moment.tz.setDefault(timezone.momentDefault);
  moment.locale(timezone.momentLocale);
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
                  {comments.map((comment) => (
                    <li key={comment.id}>
                      <div
                        className="review-content d-flex"
                        style={{ padding: 0 }}
                      >
                        <div
                          className="d-flex"
                          style={{ width: "75%", padding: "2rem" }}
                        >
                          <div style={{ width: "5%" }}>
                            <Avatar
                              sx={{
                                m: "auto",
                                bgcolor: getColorForAvatar(comment?.user?.name),
                                width: 50,
                                height: 50,
                              }}
                              alt={comment?.user?.name}
                            >
                              <h6
                                className="my-auto"
                                style={{ color: "white" }}
                              >
                                {getAvatarContent(comment?.user?.name)}
                              </h6>
                            </Avatar>
                          </div>
                          <div
                            className="reviewer-say"
                            style={{ width: "95%" }}
                          >
                            <h3 style={{ whiteSpace: "nowrap" }}>
                              {comment?.user?.name}{" "}
                              <span>
                                {comment.createdTime &&
                                  moment(comment.createdTime).format("lll")}
                              </span>
                            </h3>
                            <p>{comment?.content}</p>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "25%",
                            padding: "2rem",
                            textAlign: "start",
                          }}
                        >
                          <h6 style={{ margin: 0 }}>
                            {comment?.projectTask?.code}
                          </h6>
                          <p style={{ margin: 0, lineHeight: "1.5rem" }}>
                            {comment?.projectTask?.name}
                          </p>
                        </div>
                      </div>
                      <ul style={{ marginLeft: "8rem" }}>
                        {comment?.commentReplies &&
                          comment?.commentReplies.length > 0 &&
                          comment?.commentReplies.map((commentReply) => (
                            <li key={commentReply.id}>
                              <div className="review-content">
                                <Avatar
                                  sx={{
                                    bgcolor: getColorForAvatar(
                                      commentReply?.user?.name
                                    ),
                                    width: 50,
                                    height: 50,
                                  }}
                                  alt={commentReply?.user?.name}
                                >
                                  <h6
                                    className="my-auto"
                                    style={{ color: "white" }}
                                  >
                                    {getAvatarContent(commentReply?.user?.name)}
                                  </h6>
                                </Avatar>
                                <div className="reviewer-say">
                                  <h3>
                                    {commentReply?.user?.name}{" "}
                                    <span>
                                      {commentReply.createdTime &&
                                        moment(commentReply.createdTime).format(
                                          "lll"
                                        )}
                                    </span>
                                  </h3>
                                  <p>{commentReply?.content}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
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
