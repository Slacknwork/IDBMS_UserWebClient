import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { FaTrash } from "react-icons/fa";

import "./modal.css";

const SuggestionTableItem = () => {
  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "right" }}>
        1
      </th>
      <td className="align-middle">Room Name</td>
      <td className="align-middle">1000m2</td>
      <td className="align-middle">1,000,000 VND</td>
      <td className="align-middle">
        <div className="d-flex">
          <button
            type="button"
            className="theme-btn mx-1 py-1 align-content-center"
            style={{ width: "5rem", zIndex: 0 }}
          >
            Details
          </button>
          <button
            type="button"
            className="theme-btn mx-1 pt-0 pb-1 align-content-center"
            style={{
              width: "2rem",
              backgroundColor: "crimson",
              zIndex: 0,
            }}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

const SuggestionTable = () => {
  return (
    <div
      style={{
        height: "25rem",
        overflowY: "scroll",
      }}
    >
      <table className="table table-striped table-hover">
        <thead
          className="shadow-sm"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          <tr>
            <th scope="col" style={{ width: "6rem" }}>
              Room No.
            </th>
            <th scope="col">Name</th>
            <th scope="col">Area</th>
            <th scope="col">Price</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <SuggestionTableItem></SuggestionTableItem>
          <SuggestionTableItem></SuggestionTableItem>
          <SuggestionTableItem></SuggestionTableItem>
          <SuggestionTableItem></SuggestionTableItem>
        </tbody>
      </table>
    </div>
  );
};

export default function SuggestionModal() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <button type="button" className="theme-btn-s4 px-4 py-2" onClick={toggle}>
        Add
      </button>
      <Modal
        isOpen={modal}
        size="lg"
        scrollable={false}
        centered={true}
        toggle={toggle}
        backdrop="static"
      >
        <ModalHeader toggle={toggle}>Add Suggestion</ModalHeader>
        <ModalBody style={{ maxHeight: "30rem", overflowY: "scroll" }}>
          <section id="booking-section" className="wpo-contact-pg-section">
            <div className="wpo-contact-form-area-transparent mt-4">
              <form className="contact-validation-active">
                <div className="row">
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <label className="mb-1">Name</label>
                      <input type="text" name="name" placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <label className="mb-1">Purpose</label>
                      <input type="text" name="name" placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="col col-lg-12 col-12">
                    <div className="form-field">
                      <label className="mb-1">Description</label>
                      <textarea
                        type="text"
                        name="message"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col col-lg-12 col-12">
                    <div className="d-flex">
                      <h6 className="mb-4">Selected Item</h6>
                      <div
                        style={{
                          width: "5rem",
                          height: "5rem",
                          backgroundColor: "black",
                        }}
                      ></div>
                      <p className="mx-4 my-auto">Item name</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <SuggestionTable></SuggestionTable>
          </section>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
