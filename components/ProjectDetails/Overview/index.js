"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { getProjectById } from "../../../api/projectServices";

export default function ProjectOverview() {

  const [item, setItem] = useState([]);
  const [projectId, setProjectId] = useState("ff090f51-e6e7-4854-8f3f-0402ee32c9f8");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectById(projectId);
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
  }, [projectId]);

  return (
    <div className="wpo-project-single-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12">
            <div className="wpo-project-single-wrap">
              <div className="wpo-project-single-item">
                <div className="row align-items-left" style={{ paddingTop: '30px' }}>
                  <div className="col-lg-7">
                    <div className="wpo-project-single-title">
                      <h3>Project Name: {item && item.name} </h3>
                    </div>
                    <p>
                      Updated date: {item &&
                        new Date(item.updatedDate).toLocaleDateString("en-GB")}
                    </p>
                    <p>
                      Description: {item && item.description}
                    </p>
                  </div>
                  <div className="col-lg-5">
                    <div
                      className="wpo-project-single-content-des-right"
                      style={{ backgroundColor: "white" }}
                    >
                      <ul>
                        <li>
                          Company Name<span>{item && item.companyName}</span>
                        </li>
                        <li>
                          Company Address<span>{item && item.companyAddress}</span>
                        </li>
                        <li>
                          {item && item.type === 0
                            ? 'Lead Architect'
                            : item && item.type === 1
                              ? 'Construction Manager'
                              : 'Not specified'}
                          <span>
                            {item &&
                              item.projectParticipations &&
                              item.projectParticipations
                                .filter((participation) =>
                                  (item.type === 0 && participation.role === 2) ||
                                  (item.type === 1 && participation.role === 4))
                                .map((lead) => lead.user?.name)
                                .join(', ')}
                          </span>
                        </li>
                        <li>
                          Project Type<span>{item && item.type}</span>
                        </li>
                        <li>
                          Language<span>{item && item.language}</span>
                        </li>
                        <li>
                          Status<span>{item && item.status}</span>
                        </li>
                        <li>
                          Advertisement Status<span>{item && item.advertisementStatus}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
