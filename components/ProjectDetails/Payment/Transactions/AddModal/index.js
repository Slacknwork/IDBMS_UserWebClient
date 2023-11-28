"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector } from "react-redux";

import { createTransaction } from "/api/transactionServices";

import transactionType from "/constants/enums/transactionType";

import "./modal.css";

const pendingTransactionStatus = 0;

export default function AddModal({ refreshTransactionList, children }) {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const [amount, setAmount] = useState(0);
  const onAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };
  const [type, setType] = useState(0);
  const onTypeChange = (e) => {
    setType(Number(e.target.value));
  };
  const [note, setNote] = useState("");
  const onNoteChange = (e) => {
    setNote(e.target.value);
  };
  const [file, setFile] = useState(null);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toggle = () => setModal(!modal);
  const onCreateTransactionClick = async () => {
    toggle();
    const postData = async () => {
      try {
        const response = await createTransaction(
          {
            type,
            amount,
            note,
            userId: user.id,
            projectId: params.id,
            status: pendingTransactionStatus,
          },
          file
        );
        return response;
      } catch (e) {
        console.log("Error: " + e);
      }
    };
    await postData();
    await refreshTransactionList();
  };

  return (
    <div>
      <button
        type="button"
        className="theme-btn px-4"
        style={{ height: "50px" }}
        onClick={toggle}
      >
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
        <ModalHeader toggle={toggle}>Create Transaction</ModalHeader>
        <ModalBody style={{ maxHeight: "30rem", overflowY: "scroll" }}>
          <section id="booking-section" className="wpo-contact-pg-section">
            <div className="wpo-contact-form-area-transparent mt-4">
              <form className="contact-validation-active">
                <div className="row">
                  <div className="col col-lg-12 col-12 mb-2">
                    <p>
                      Upload screenshot of your transaction and wait for
                      approval.
                    </p>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <label className="mb-1">Amount</label>
                      <input
                        type="number"
                        placeholder="Task Name"
                        value={amount}
                        onChange={onAmountChange}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <label className="mb-1">Type</label>
                      <select
                        type="text"
                        style={{
                          backgroundColor: "white",
                          color: "black",
                        }}
                        value={type}
                        onChange={onTypeChange}
                      >
                        <option disabled>Transaction Type</option>
                        {transactionType.map((type, index) => (
                          <option key={type} value={index}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <label className="mb-1">Note</label>
                      <textarea
                        type="number"
                        placeholder="Task Name"
                        value={note}
                        onChange={onNoteChange}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <label className="mb-1">Image</label>
                      <input
                        type="file"
                        placeholder="Choose Receipt Image..."
                        onChange={onFileChange}
                      />
                    </div>
                  </div>
                </div>
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
            <Button
              className="theme-btn py-2 px-4"
              onClick={onCreateTransactionClick}
            >
              Create
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
