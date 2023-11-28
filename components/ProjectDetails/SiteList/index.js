import React, { useEffect, useRef, useState } from "react";
import { Link } from "/navigation";

import urls from "/constants/urls";
import { getSitesByProjectId } from "/api/siteServices";
import { toast } from "react-toastify";
import Image from "next/image";
import { useParams } from "next/navigation";

const SiteItem = (details) => {
  const params = useParams();
  const item = details.site;
  const siteDetailsUrl = urls.project.id.site.siteNo.getUri(params.id, item.id);
  console.log(item);
  return (
    <div className="col col-lg-6 col-12" style={{ height: "18rem" }}>
      <div
        className="d-flex justify-content-between shadow p-4 my-4 mx-1"
        style={{ backgroundColor: "white" }}
      >
        <div className="d-flex">
          <div
            className="shop-img"
            style={{ width: "10rem", height: "10rem", position: "relative" }}
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/7100/7100358.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="d-flex mx-4 my-auto">
            <div className="shop-info my-auto">
              <h3>{item && item.name}</h3>
              <p>
                {item && item.usePurpose}
                <br />
                {item && item.address}
              </p>
            </div>
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
  );
};

export default function SiteList() {
  const params = useParams();
  const [values, setValues] = useState([]);
  const [projectId, setProjectId] = useState(params.id);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getSitesByProjectId(projectId);
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
    <div className="container pb-0 mt-4">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <div className="d-flex justify-content-between mb-4">
            <h3 className="my-auto">Project Sites</h3>
          </div>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <div
            style={{
              height: "30rem",
              overflowY: "scroll",
            }}
          >
            {values &&
              values.map((item, index) => (
                <SiteItem key={item.id} site={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
