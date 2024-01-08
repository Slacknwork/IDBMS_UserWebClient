"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CircularProgress, Stack } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { FaPlus } from "react-icons/fa";

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
      toast.error("Error: Comments!");
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
      toast.success("Created Comment successfully!");
      await fetchData();
    } catch (error) {
      toast.error("Error: Create Comment!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="review">
      <div className="add-review-sec">
        <h3 style={{ fontSize: 24 }}>Add a Comment</h3>
        <div className="form-field">
          <textarea
            style={{ color: "black", height: "8rem" }}
            name="comment"
            value={comment}
            onChange={onCommentChange}
            placeholder="Your Comment..."
          ></textarea>
        </div>
        <div className="form-submit d-flex justify-content-between">
          <div className="d-flex">
            <button
              onClick={() => setIsModalOpen(true)}
              className="add-file-button border-0"
            >
              <FaPlus style={{ fontSize: 24 }} />
            </button>
            <Modal
              centered={true}
              isOpen={isModalOpen}
              toggle={() => setIsModalOpen(false)}
            >
              <ModalHeader toggle={() => setIsModalOpen(false)}>
                Upload File
              </ModalHeader>
              <ModalBody>
                <div {...getRootProps()} style={dropzoneStyles}>
                  <input {...getInputProps()} />
                  <p>Drag & drop a file here, or click to select a file</p>
                </div>
              </ModalBody>
            </Modal>
            <input
              type="file"
              id="fileInput"
              accept=".pdf, .doc, .docx, .txt" // Add the desired file formats
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <p className="my-auto mx-4">
              {selectedFile ? selectedFile.name : "No file selected."}
            </p>
            <style jsx>{`
              .add-file-button {
                background-color: rgba(255, 255, 255, 1);
                display: inline-block;
                padding: 10px;
                color: #caad06;
                cursor: pointer;
              }

              .add-file-button:hover {
                background-color: #f0f0f0;
              }
            `}</style>
          </div>
          <div className="d-flex">
            <button
              type="submit"
              className="theme-btn px-4 py-2"
              onClick={handleOpenConfirmModal}
            >
              Submit
            </button>
            <Modal
              isOpen={isModalConfirmOpen}
              toggle={handleCloseConfirmModal}
              centered
            >
              <ModalHeader toggle={handleCloseConfirmModal}>
                Confirm Submission
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to submit the comment?</p>
              </ModalBody>
              <ModalFooter>
                <button
                  className="theme-btn-s2 px-4 py-2"
                  onClick={handleCloseConfirmModal}
                >
                  Cancel
                </button>
                <div className="d-flex">
                  <button
                    className="theme-btn px-4 py-2 rounded-0"
                    onClick={handleSubmitComment}
                  >
                    Submit
                  </button>
                </div>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
      <div className="review-section mt-4" style={{ minHeight: "30rem" }}>
        <h3>Comments</h3>
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
                    Lorem is simply dummy text of the printing and typesetting
                    industry. Lorem has been the industry's.
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
                        typesetting industry. Lorem has been the industry's.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <Stack sx={{ height: "30rem" }}>
            <p style={{ margin: "auto", textAlign: "center" }}>No data.</p>
          </Stack>
        )}
      </div>
    </div>
  );
}
