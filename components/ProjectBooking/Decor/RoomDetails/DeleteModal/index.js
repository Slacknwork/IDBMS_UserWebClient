"use client";

import React, { useState } from "react";
import { useRouter } from "/navigation";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";

import urls from "/constants/urls";

import { deleteRoom } from "/store/reducers/draftProject";

export default function SuggestionModal() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const onDeleteClick = () => {
    setModal(!modal);
    router.push(
      urls.project.booking.decor.site.siteNo.floor.floorNo.getUri(
        params.siteNo,
        params.floorNo
      )
    );
    dispatch(
      deleteRoom({
        siteNo: params.siteNo,
        floorNo: params.floorNo,
        roomNo: params.roomNo,
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
        Delete room
      </button>
      <Modal isOpen={modal} scrollable={false} centered={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Suggestion</ModalHeader>
        <ModalBody style={{ maxHeight: "30rem", overflowY: "scroll" }}>
          Delete this room?
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
