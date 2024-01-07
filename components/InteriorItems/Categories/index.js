"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

import {getAllInteriorItemCategories} from "/services/interiorItemCategoryServices";

function Category(categoryDetails) {
  const item = categoryDetails.item;
  return (
    <div className="col col-xl-3 col-lg-6 col-md-6 col-12">
      <div
        className="office-info-item row"
        style={{
          backgroundColor: "white",
          maxHeight: "150px",
          overflow: "hidden",
        }}
      >
        <div className="col-6 d-flex align-items-center justify-content-center">
          <div className="icon">
            <img
              src={item && item.iconImageUrl}
              style={{ objectFit: "cover", width: "7rem", height: "7rem" }}
              alt="Icon"
            />
          </div>
        </div>
        <div
          className="col-6 d-flex align-items-center justify-content-center"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2,
          }}
        >
          <h2 style={{ fontSize: "25px" }}>{item && item.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default function InteriorItemCategories() {
  const [values, setValues] = useState([]);
  const [userId, setUserId] = useState("A3C81D01-8CF6-46B7-84DF-DCF39EB7D4CF");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getAllInteriorItemCategories();
          setValues(data.list);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  }, []);

  return (
    <section className="wpo-contact-pg-section">
      <div className="container ">
        <div className="office-info p-0" style={{ marginBottom: "3rem" }}>
          <div className="row gx-5 gy-4">
            {values &&
              values
                .slice(0, 8)
                .map((item, index) => <Category key={index} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
