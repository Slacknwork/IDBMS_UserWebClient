"use client";

import { useSelector } from "react-redux";

import SubmitModal from "./SubmitModal";

export default function BookingSubmission() {
  const draftProject = useSelector((state) => state.draftProject);

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-12">
            <h3 className="mb-3">Submit Information</h3>
          </div>
          <div className="col col-lg-12 col-12">
            <table className="mx-5">
              <tbody>
                <tr>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ fontWeight: 1000, lineHeight: 1.5 }}>Name: </p>
                  </td>
                  <td style={{ paddingRight: "4rem" }}>
                    <p style={{ lineHeight: 1.5 }}>{draftProject.name}</p>
                  </td>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ fontWeight: 1000, lineHeight: 1.5 }}>
                      Company Name:{" "}
                    </p>
                  </td>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ lineHeight: 1.5 }}>
                      {draftProject.companyName}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ fontWeight: 1000, lineHeight: 1.5 }}>
                      Company Address:{" "}
                    </p>
                  </td>
                  <td style={{ paddingRight: "4rem" }}>
                    <p style={{ lineHeight: 1.5 }}>
                      {draftProject.companyAddress}
                    </p>
                  </td>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ fontWeight: 1000, lineHeight: 1.5 }}>
                      Company Code:{" "}
                    </p>
                  </td>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ lineHeight: 1.5 }}>
                      {draftProject.companyCode}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      paddingRight: "1rem",
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                    }}
                  >
                    <p style={{ fontWeight: 1000, lineHeight: 1.5 }}>
                      Description:
                    </p>
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      paddingRight: "4rem",
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                    }}
                  >
                    <p style={{ lineHeight: 1.5 }}>
                      {draftProject.description}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ fontWeight: 1000, lineHeight: 1.5 }}>Area: </p>
                  </td>
                  <td style={{ paddingRight: "4rem" }}>
                    <p style={{ lineHeight: 1.5 }}>
                      {draftProject.totalArea} m<sup>2</sup>
                    </p>
                  </td>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ fontWeight: 1000, lineHeight: 1.5 }}>
                      Estimate Business Days:{" "}
                    </p>
                  </td>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ lineHeight: 1.5 }}>
                      {draftProject.estimateBusinessDay} days
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col col-12" style={{ marginTop: "3rem" }}>
            <div className="d-flex justify-content-center">
              <div className="d-flex">
                <SubmitModal>Submit Project</SubmitModal>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
