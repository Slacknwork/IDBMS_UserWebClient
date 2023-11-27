"use client";

import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";

import { deleteTask } from "/store/reducers/draftProject";

export default function DeleteModal({ taskNo }) {
  const params = useParams();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const onDeleteClick = () => {
    setModal(!modal);
    dispatch(
      deleteTask({
        siteNo: params.siteNo,
        floorNo: params.floorNo,
        roomNo: params.roomNo,
        taskNo: taskNo,
      })
    );
  };

  return (
    <div>
      <button
        type="button"
        className="theme-btn-s4 px-4 py-2"
        style={{ backgroundColor: "crimson" }}
        onClick={toggle}
      >
        Delete Task
      </button>
      <Modal isOpen={modal} scrollable={false} centered={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Suggestion</ModalHeader>
        <ModalBody style={{ maxHeight: "30rem", overflowY: "scroll" }}>
          Delete this task?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
