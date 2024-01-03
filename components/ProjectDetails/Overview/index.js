import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { getProjectById } from "/services/projectServices";

export default function ProjectOverview() {
  // INIT
  const params = useParams();

  // FETCH DATA
  const [project, setProject] = useState({});
  const fetchProject = async () => {
    try {
      const project = await getProjectById(params.id);
      setProject(project);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Dự án!");
    }
  };
  return (
    <div className="wpo-project-single-area ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11 col-12">
            <div className="wpo-project-single-wrap">
              <div className="wpo-project-single-item">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="wpo-project-single-item list-widget">
                      <div className="wpo-project-single-title">
                        <h3>Our Strategies</h3>
                      </div>
                      <p>
                        Massa volutpat odio facilisis purus sit elementum. Non,
                        sed velit dictum quam. Id risus pharetra est, at
                        rhoncus, nec ullamcorper tincidunt. Id aliquet duis
                        sollicitudin diam.
                      </p>
                      <ul>
                        <li>Non saed velit dictum quam risus pharetra esta.</li>
                        <li>
                          Id risus pharetra est, at rhoncus, nec ullamcorper
                          tincidunt.
                        </li>
                        <li>
                          Hac nibh fermentum nisi, platea condimentum cursus.
                        </li>
                        <li>
                          Massa volutpat odio facilisis purus sit elementum.
                        </li>
                        <li>Elit curabitur amet risus bibendum.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="wpo-project-single-content-des-right">
                      <ul>
                        <li>
                          Location :<span>7 Lake Street,London</span>
                        </li>
                        <li>
                          Client :<span>wpOceans</span>
                        </li>
                        <li>
                          Architect :<span>Harry Johnson</span>
                        </li>
                        <li>
                          Project Type :<span>Interior</span>
                        </li>
                        <li>
                          Duration :<span>6 Month</span>
                        </li>
                        <li>
                          Completion :<span>15 Apr 2022</span>
                        </li>
                        <li>
                          Share :<span>Architectural, Business</span>
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
