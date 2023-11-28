"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import calculationUnit from "/constants/enums/calculationUnit";
import { getProjectTaskById } from "/api/projectTaskServices";
import TaskBreadcrumb from "/components/ProjectDetails/TaskBreadcrumb";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#f6e166",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: "#caad06",
  },
}));

export default function TaskDetails() {
  const params = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectTaskById(params.taskId);
          console.log(data);
          setItem(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  });

  return (
    <div className="pb-0 container">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12">
            <TaskBreadcrumb
              id={params.id}
              taskId={item.id}
              taskName={item.name}
            ></TaskBreadcrumb>
          </div>
          <div className="col col-lg-12 col-12">
            <div className="form-field">
              <h1>{item.name}</h1>
            </div>
            <div className="form-field">
              <h4>{item.taskCategory?.name || "Unclassified"}</h4>
            </div>
          </div>
          <div className="col col-lg-12 col-12">
            <div className="form-field mt-2">
              <p style={{ fontSize: 18 }}>{item.description}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-4 col-12">
            <div className="form-field">
              <h4>Progress</h4>
            </div>
            <div className="form-field">
              <div style={{ position: "relative" }}>
                <BorderLinearProgress
                  sx={{ mt: 1 }}
                  variant="determinate"
                  value={item.percentage}
                ></BorderLinearProgress>
                <p
                  style={{
                    position: "absolute",
                    top: "0%",
                    left: "47%",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  {item.percentage}%
                </p>
                <tr>
                  <td style={{ paddingRight: "1rem", paddingTop: "1rem" }}>
                    <p style={{ fontWeight: 1000 }}>Started:</p>
                  </td>
                  <td style={{ paddingRight: "4rem" }}>
                    <p>
                      {new Date(item.startedDate).toLocaleDateString("vi-VN")}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: "1rem" }}>
                    <p style={{ fontWeight: 1000 }}>Ended:</p>
                  </td>
                  <td>
                    <p>{new Date(item.endDate).toLocaleDateString("vi-VN")}</p>
                  </td>
                </tr>
              </div>
            </div>
          </div>
          <div className="col offset-lg-1 col-lg-7 col-12">
            <div className="form-field">
              <h4>Pricing</h4>
            </div>
            <div className="form-field">
              <tr>
                <td style={{ paddingRight: "2rem" }}>
                  <p style={{ fontWeight: 1000 }}>Unit Price:</p>
                </td>
                <td>
                  <p>{item.pricePerUnit?.toLocaleString(params.locale)} VND</p>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: "2rem" }}>
                  <p style={{ fontWeight: 1000 }}>Unit In Contract:</p>
                </td>
                <td>
                  <p>
                    {item.unitInContract}{" "}
                    {calculationUnit[item.calculationUnit]}
                  </p>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: "2rem" }}>
                  <p style={{ fontWeight: 1000 }}>Unit Used:</p>
                </td>
                <td>
                  <p>
                    {item.unitUsed} {calculationUnit[item.calculationUnit]}
                  </p>
                </td>
              </tr>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
