import React, { useEffect, useRef, useState } from "react";
import { Link } from "/navigation";

import urls from "/constants/urls";
import { getSitesByProjectId } from "../../../api/siteServices";
import { toast } from "react-toastify";
import Image from "next/image";

const SiteItem = (details) => {
  const siteDetailsUrl = urls.project.id.site.siteNo.getUri(1, 1);
  const item = details.site;
  console.log(item)
  return (
    <div className="container" style={{ height: "18rem" }}>
      <div
        className="row shadow p-4 my-4 mx-1"
        style={{ backgroundColor: "white" }}
      >
        <div className="col-4 col-lg-3 my-auto">
          <div className="shop-img">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/7100/7100358.png"
              alt=""
              width={0}
              height={0}
              style={{ width: "14rem", height: "14rem", objectFit: "cover" }}
              unoptimized={true}
            />
          </div>
        </div>
        <div className="col-8 col-lg-9 d-flex align-items-start justify-content-between">
          <div className="shop-info my-auto">
            <h3 className="">Site name: {item && item.name}</h3>
            <div className="des">
              <p>Address: {item && item.address}</p>
              <p>Use Purpose:{item && item.usePurpose} </p>
              <p>Description: {item && item.description}</p>
            </div>
          </div>
          <div className="mt-auto d-flex gap-3">
            <div>
              <Link href={siteDetailsUrl} className="theme-btn px-4" replace>
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SiteList({ projectType }) {

  const [values, setValues] = useState([]);
  const [projectId, setProjectId] = useState("8B84897A-5A93-429C-A5B0-B11AE7483DD3");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getSitesByProjectId(projectId);
          console.log(data);
          setValues(data);
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
    <div className="container pb-0">
      <form className="contact-validation-active">
        <div className="row justify-content-center">
          <div className="col col-lg-10 col-12 mb-4">
            <div className="d-flex justify-content-between mb-4">
              <h3 className="my-auto">Project Sites</h3>
            </div>
            <div
              style={{
                height: "30rem",
                overflowY: "scroll",
              }}
            >
              {values &&
                values.map((item, index) => (
                  <SiteItem key={index} site={item} />
                ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
