"use client";

import React, { useState } from "react";
import { useRouter } from "/navigation";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import urls from "/constants/urls";

import { deleteSite } from "/store/reducers/draftProject";

export default function DeleteModal() {
  const params = useParams();
  const router = useRouter();
  const draftProject = useSelector((state) => state.draftProject);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const onDeleteClick = () => {
    setModal(!modal);
    router.push(urls.project.booking.decor.site.getUri());
    dispatch(
      deleteSite({
        siteNo: params.siteNo,
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
        Delete Site
      </button>
      <Modal isOpen={modal} scrollable={false} centered={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete site</ModalHeader>
        <ModalBody style={{ maxHeight: "30rem", overflowY: "scroll" }}>
          Delete site: {draftProject.sites[params.siteNo]?.name}?
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
