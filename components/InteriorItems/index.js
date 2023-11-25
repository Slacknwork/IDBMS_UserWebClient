import React from "react";
import { Link } from "/navigation";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import InteriorItemCategories from "./Categories";
import Pagination from "/components/Pagination";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllInteriorItems } from "../../api/interiorItemServices";
import Image from "next/image";

function InteriorItemSearchBar() {
  return (
    <div className="row">
      <div className="col col-lg-6 col-12">
        <div className="blog-sidebar">
          <div className="widget search-widget mb-4">
            <form>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Document.."
                />
                <button type="submit">
                  <i className="ti-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col col-lg-3 col-12">
        <div className="wpo-contact-pg-section">
          <form>
            <div className="wpo-contact-form-area-transparent row">
              <div className="form-field">
                <select
                  type="text"
                  name="subject"
                  className="rounded-2"
                  style={{ backgroundColor: "white", height: "55px" }}
                >
                  <option>Category</option>
                  <option>Architecture</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col col-lg-3 col-12">
        <div className="wpo-contact-pg-section">
          <form>
            <div className="wpo-contact-form-area-transparent row">
              <div className="form-field">
                <select
                  type="text"
                  name="subject"
                  className="rounded-2"
                  style={{ backgroundColor: "white", height: "55px" }}
                >
                  <option>Category</option>
                  <option>Architecture</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InteriorItemFilter() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#caad06",
      },
    },
  });

  return (
    <div className="shadow p-4" style={{ backgroundColor: "white" }}>
      <ThemeProvider theme={theme}>
        <h4 className="mt-2">Filter Items</h4>
        <FormControlLabel control={<Checkbox />} label="Filter" />
        <FormControlLabel control={<Checkbox />} label="Filter" />
        <FormControlLabel control={<Checkbox />} label="Filter" />
        <h6>Price</h6>
        <Slider getAriaLabel={() => "Price range"} valueLabelDisplay="auto" />
      </ThemeProvider>
    </div>
  );
}

function InteriorItemSingle(itemDetails) {
  const item = itemDetails.item;
  return (
    <div className="grid" style={{ backgroundColor: "white" }}>

      <Image
        src="https://media.istockphoto.com/id/1334037436/photo/wooden-chair-isolated-on-white-with-clipping-path.jpg?s=612x612&w=0&k=20&c=ToZrdNt8mNvaPLEuMg9Pj6u-5etxNwcIUzVOIF088yM="
        alt=""
        width={0}
        height={0}
        style={{ width: "24rem", height: "24rem", objectFit: "cover" }}
        unoptimized={true}
      />
      <div className="details">
        <h3 style={{ height: "55px", overflowY: "auto" }}>
          <Link href="/interior/1">{item && item.name}</Link>
        </h3>
        <span>{item && item.estimatePrice && item.estimatePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        {
          // <span>{item && item.estimatePrice && item.estimatePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        }
        <div className="add-to-cart">
          <button
            data-bs-toggle="tooltip"
            data-bs-html="true"
            title="Add to Cart"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InteriorItems() {

  const [values, setValues] = useState([]);
  const [userId, setUserId] = useState("A3C81D01-8CF6-46B7-84DF-DCF39EB7D4CF");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getAllInteriorItems();
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
  }, []);

  return (
    <section className="wpo-shop-section">
      <div className="container my-4">
        <InteriorItemCategories></InteriorItemCategories>
        <div className="row">
          <div className="col col-lg-3 col-12">
            <InteriorItemFilter></InteriorItemFilter>
          </div>
          <div className="col col-lg-9 col-12">
            <InteriorItemSearchBar></InteriorItemSearchBar>
            <div>
              {values && values.map((item, index) => (
                <InteriorItemSingle key={index} item={item} />
              ))}
            </div>
            <Pagination></Pagination>
          </div>
        </div>
      </div>
    </section>
  );
}
