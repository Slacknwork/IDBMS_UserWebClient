"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { getProjectTaskById } from "/api/projectTaskServices";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
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
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="form-field">
              <h2>{item.name}</h2>
            </div>
          </div>
          <div className="col col-lg-12 col-12">
            <div className="col col-lg-12 col-12">
              <table>
                <tbody>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Category:</p>
                    </td>
                    <td>
                      <p>{item.taskCategory?.name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Percentage done:</p>
                    </td>
                    <td>
                      <BorderLinearProgress
                        sx={{ mt: -1 }}
                        variant="determinate"
                        value={item.percentage}
                      ></BorderLinearProgress>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Unit Price:</p>
                    </td>
                    <td>
                      <p>{item.pricePerUnit}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Unit In Contract:</p>
                    </td>
                    <td>
                      <p>{item.unitInContract}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Unit Used:</p>
                    </td>
                    <td>
                      <p>{item.unitUsed}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Started:</p>
                    </td>
                    <td>
                      <p>
                        {new Date(item.startedDate).toLocaleDateString("vi-VN")}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Ended:</p>
                    </td>
                    <td>
                      <p>
                        {new Date(item.endDate).toLocaleDateString("vi-VN")}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "2rem" }}>
                      <p style={{ fontWeight: 1000 }}>Description:</p>
                    </td>
                    <td>
                      <p>{item.description}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
