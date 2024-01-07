import React, { useRef, useState, useEffect } from "react";
import { Link } from "/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import InteriorItemCategories from "./Categories";
import Pagination from "/components/Pagination";
import { useTranslations } from "next-intl";

import {
  getAllInteriorItems,
} from "/services/interiorItemServices";

const pageQuery = "page";
const pageSize = 6;

function InteriorItemSearchBar() {
const t = useTranslations("InteriorItems");

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
                  placeholder={t("Search")}
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
  const t = useTranslations("InteriorItems");

  return (
    <div className="shadow p-4" style={{ backgroundColor: "white" }}>
      <ThemeProvider theme={theme}>
        <h4 className="mt-2">{t("Filter")}</h4>
        <FormControlLabel control={<Checkbox />} label="Filter" />
        <FormControlLabel control={<Checkbox />} label="Filter" />
        <FormControlLabel control={<Checkbox />} label="Filter" />
        <h6>{t("Price")}</h6>
        <Slider getAriaLabel={() => "Price range"} valueLabelDisplay="auto" />
      </ThemeProvider>
    </div>
  );
}

function InteriorItemSingle(itemDetails) {
  const item = itemDetails.item;
  const t = useTranslations("InteriorItems");

  return (
    <div className="grid" style={{ backgroundColor: "white" }}>
      <Image
        src={item.imageUrl ?? ""}
        alt=""
        width={0}
        height={0}
        style={{ width: "24rem", height: "24rem", objectFit: "cover" }}
        unoptimized={true}
      />
      <div className="details">
        <h3 style={{ height: "55px", overflowY: "auto" }}>
          <Link href={`/interior/${item.id}`}>{item && item.name}</Link>
        </h3>
        <div className="price">
          <span>
            {item &&
              item.estimatePrice &&
              item.estimatePrice.toLocaleString("en-US") + " VND"}
          </span>
        </div>
        <div className="add-to-cart">
          <button
            data-bs-toggle="tooltip"
            data-bs-html="true"
            title="Add to Cart"
          >
            {t("Cart")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InteriorItems() {
  const searchParams = useSearchParams();

  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interiorItemCount, setInteriorItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get(pageQuery) ? Number(searchParams.get(pageQuery)) - 1 : 0
  );
  const initialized = useRef(false);

  const getInteriorItemList = () => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getAllInteriorItems(pageSize, currentPage);
          setValues(data.list);
          setInteriorItemCount(data.totalItem);
          setLoading(false);
          console.log(data.list)
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
    initialized.current = false;
  };

  useEffect(() => {
    getInteriorItemList();
  }, [currentPage]);

  return (
    <div className="container wpo-shop-section my-4">
      <InteriorItemCategories></InteriorItemCategories>
      <div className="row">
        <div className="col col-lg-3 col-12">
          <InteriorItemFilter></InteriorItemFilter>
        </div>
        <div className="col col-lg-9 col-12">
          <InteriorItemSearchBar></InteriorItemSearchBar>
          <div>
            { values.map((item) => (
                <InteriorItemSingle key={item.id} item={item} />
              ))}
          </div>
          <Pagination
            pageCount={Math.ceil(interiorItemCount / 6)}
            pageQuery={pageQuery}
            onClick={(i) => {
              setCurrentPage(i);
            }}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
