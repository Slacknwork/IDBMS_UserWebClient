"use client";

import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector } from "react-redux";

import { createDecorProject } from "/api/projectServices";

const projectMapping = (draftProject) => {
  return {
    name: draftProject.name,
    companyName: draftProject.companyName,
    companyAddress: draftProject.companyAddress,
    companyCode: draftProject.companyCode,
    description: draftProject.description,
    projectCategoryId: Number(draftProject.projectCategoryId),
    estimatedPrice: draftProject.totalPrice,
    language: Number(draftProject.language),
    projectDesignId: Number(draftProject.projectDesignId),
    estimateBusinessDay: draftProject.estimateBusinessDay,
    userId: "c2ea739f-0bc1-4d87-9dbf-3ff9182de2df",
    sites: draftProject.sites.map((site) => ({
      name: site.name,
      description: site.description,
      address: site.address,
      usePurpose: site.usePurpose,
      area: site.totalArea,
      floors: site.floors.map((floor, index) => ({
        description: floor.description,
        usePurpose: floor.usePurpose,
        floorNo: index,
        area: floor.totalArea,
        rooms: floor.rooms.map((room) => ({
          description: room.description,
          usePurpose: room.usePurpose,
          area: room.area,
          pricePerArea: room.pricePerArea,
          roomTypeId: room.roomTypeId,
          tasks: room.tasks.map((task) => ({
            name: task.name,
            description: task.description,
            calculationUnit: task.calculationUnit,
            unitInContract: task.unitInContract,
            interiorItemId: task.interiorItemId,
          })),
        })),
      })),
    })),
  };
};

export default function DeleteModal({ children }) {
  const draftProject = useSelector((state) => state.draftProject);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const onSubmitClick = () => {
    setModal(!modal);

    const project = projectMapping(draftProject);
    const postData = async () => {
      try {
        const response = await createDecorProject(project);
        setLoading(false);
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };
    postData();
  };

  return (
    <div>
      <button
        type="button"
        className="theme-btn-s4 px-4 py-2"
        style={{
          paddingRight: "4rem",
          paddingLeft: "4rem",
        }}
        onClick={toggle}
      >
        {children}
      </button>
      <Modal isOpen={modal} scrollable={false} centered={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete site</ModalHeader>
        <ModalBody style={{ maxHeight: "30rem", overflowY: "scroll" }}>
          Submit this project?
        </ModalBody>
        <ModalFooter>
          <div className="d-flex">
            <Button className=" theme-btn-s2 py-2 px-4" onClick={toggle}>
              Cancel
            </Button>
          </div>
          <div className="d-flex">
            <Button className="theme-btn py-2 px-4" onClick={onSubmitClick}>
              Submit
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
