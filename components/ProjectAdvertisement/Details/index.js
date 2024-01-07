import Image from "next/image";
import { Link } from "/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getAdvertisementProjectById } from "/services/advertisementServices";
import { toast } from "react-toastify";

export default function AdvertisementDetails() {
  // INIT
  const params = useParams();
  const language = params?.locale === "en-US" ? "english" : params?.locale === "vi-VN" ? "vietnamese" : "";

  // FETCH DATA
  const [project, setProject] = useState({});

  const fetchDataFromApi = async () => {
    try {
      const project = await getAdvertisementProjectById(params.id);
      setProject(project);
    } catch (error) {
      toast("Lỗi dữ liệu: Dự án quảng cáo!");
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <div className="wpo-project-single-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="wpo-project-single-wrap">
              <div className="wpo-project-single-item">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="wpo-project-single-content-des-left">
                      <h2>{project.name ?? ""}</h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: language === "english"
                            ? project?.englishAdvertisementDescription ?? ""
                            : project?.advertisementDescription ?? "",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="wpo-project-single-content-des-right bg-white">
                      <Image
                        src={project?.representImageUrl ?? ""}
                        width={500}
                        height={500}
                        unoptimized
                        style={{
                          boxShadow: "0px 2px 10px rgba(14, 29, 44, 0.15)",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                      <ul>
                        <li>
                          Client :<span>Robert William</span>
                        </li>
                        <li>
                          Location :<span>7 Lake Street,London</span>
                        </li>
                        <li>
                          Date :<span>20 Apr 2021</span>
                        </li>
                        <li>
                          Duration : <span>3 Month</span>
                        </li>
                        <li>
                          Tag :<span>Consulting, Business</span>
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
