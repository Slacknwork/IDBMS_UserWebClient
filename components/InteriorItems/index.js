import React from "react";
import { Link } from "/navigation";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import InteriorItemCategories from "./Categories";
import Pagination from "/components/Pagination";

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

function InteriorItemSingle() {
  return (
    <div className="grid" style={{ backgroundColor: "white" }}>
      <div className="img-holder">
        <img src="" alt="" />
      </div>
      <div className="details">
        <h3>
          <Link href="/interior/1">Product Title</Link>
        </h3>
        <span>$1000</span>
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

function InteriorItemList() {
  return (
    <div>
      <InteriorItemSingle></InteriorItemSingle>
      <InteriorItemSingle></InteriorItemSingle>
      <InteriorItemSingle></InteriorItemSingle>
      <InteriorItemSingle></InteriorItemSingle>
      <InteriorItemSingle></InteriorItemSingle>
      <InteriorItemSingle></InteriorItemSingle>
    </div>
  );
}

export default function InteriorItems() {
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
            <InteriorItemList></InteriorItemList>
            <Pagination></Pagination>
          </div>
        </div>
      </div>
    </section>
  );
}
