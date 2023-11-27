import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from "react-toastify";

import "./modal.css";

import { getAllInteriorItems } from "/api/interiorItemServices";

import { addTask, editTask } from "/store/reducers/draftProject";

import DeleteModal from "./DeleteModal";

export default function SuggestionModal({ title, task, index, children }) {
  const params = useParams();
  const dispatch = useDispatch();
  const draftProject = useSelector((state) => state.draftProject);
  const draftTask = task
    ? draftProject.sites[params.siteNo].floors[params.floorNo].rooms[
        params.roomNo
      ].tasks[index]
    : null;

  const [modal, setModal] = useState(false);

  const [name, setName] = useState(task ? draftTask.name : "");
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const [unitInContract, setUnitInContract] = useState(
    task ? draftTask.unitInContract : 0
  );
  const onUnitInContractChange = (e) => {
    setUnitInContract(Number(e.target.value));
  };
  const [description, setDescription] = useState(
    task ? draftTask.description : ""
  );
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const [interiorItems, setInteriorItems] = useState([]);
  const [interiorItem, setInteriorItem] = useState({});

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getAllInteriorItems();
          setInteriorItems(data);
          const interiorItemIndex = draftTask
            ? data.findIndex(
                (interiorItem) => interiorItem.id == draftTask.interiorItemId
              )
            : 0;
          setInteriorItem(data[interiorItemIndex]);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  });

  const toggle = () => setModal(!modal);
  const onCreateTaskClick = () => {
    if (task) {
      dispatch(
        editTask({
          siteNo: params.siteNo,
          floorNo: params.floorNo,
          roomNo: params.roomNo,
          taskNo: index,
          name,
          unitInContract,
          description,
          interiorItemId: interiorItem.id,
          interiorItemName: interiorItem.name,
          calculationUnit: interiorItem.calculationUnit,
        })
      );
    } else {
      dispatch(
        addTask({
          siteNo: params.siteNo,
          floorNo: params.floorNo,
          roomNo: params.roomNo,
          name,
          unitInContract,
          description,
          interiorItemId: interiorItem.id,
          interiorItemName: interiorItem.name,
          calculationUnit: interiorItem.calculationUnit,
        })
      );
    }
    toggle();
  };

  return (
    <div>
      <button type="button" className="theme-btn-s4 px-4 py-2" onClick={toggle}>
        {children}
      </button>
      <Modal
        isOpen={modal}
        size="lg"
        scrollable={false}
        centered={true}
        toggle={toggle}
        backdrop="static"
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody style={{ maxHeight: "30rem", overflowY: "scroll" }}>
          <section id="booking-section" className="wpo-contact-pg-section">
            <div className="wpo-contact-form-area-transparent mt-4">
              <form className="contact-validation-active">
                <div className="row">
                  <div className="col col-lg-12 col-12 mb-2">
                    <p>
                      You can make a suggestion here, and select an Interior
                      item if needed.
                    </p>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <label className="mb-1">Name</label>
                      <input
                        type="text"
                        placeholder="Task Name"
                        value={name}
                        onChange={onNameChange}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <label className="mb-1">Quantity</label>
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={unitInContract}
                        onChange={onUnitInContractChange}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-12 col-12">
                    <div className="form-field">
                      <label className="mb-1">Description</label>
                      <textarea
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={onDescriptionChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col col-lg-12 col-12">
                    <div className="d-flex">
                      <h6 className="my-auto">Selected Item</h6>
                      <div className="mx-4 d-flex">
                        <div
                          style={{
                            width: "5rem",
                            height: "5rem",
                            backgroundColor: "black",
                          }}
                        ></div>
                        <Autocomplete
                          size="small"
                          value={interiorItem}
                          options={interiorItems}
                          onChange={(event, newValue) =>
                            setInteriorItem(newValue)
                          }
                          getOptionLabel={(option) => option.name}
                          sx={{ width: "30rem", mx: 2, my: "auto" }}
                          renderInput={(params) => (
                            <TextField
                              key={params.id}
                              {...params}
                              label="Interior item"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {task && (
                  <div className="row">
                    <div className="d-flex justify-content-end">
                      <DeleteModal taskNo={index}></DeleteModal>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </section>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex">
            <Button className=" theme-btn-s2 py-2 px-4" onClick={toggle}>
              Cancel
            </Button>
          </div>
          <div className="d-flex">
            <Button className="theme-btn py-2 px-4" onClick={onCreateTaskClick}>
              {task ? `Edit` : `Create`}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
