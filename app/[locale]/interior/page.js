"use client";

import React, { Fragment } from "react";
import PageTitle from "/components/PageTitle";
import Scrollbar from "/components/Scrollbar";
import InteriorItems from "/components/InteriorItems";
import InteriorItemsCategories from "/components/InteriorItemCategories";
import api from "/api";
import categories from "/api/categories";
import Navbar from "/components/Navbar";
import Footer from "/components/footer/Footer";
import Logo from "/public/images/logo.svg";

const InteriorShopPage = () => {
  const productsArray = api();

  const products = productsArray;

  return (
    <Fragment>
      <Navbar Logo={Logo} hclass={"wpo-header-style-2"} />
      <PageTitle pageTitle={"Interior items"} pagesub={"Interior"} />
      <InteriorItemsCategories categories={categories} />
      <section className="wpo-shop-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9">
              <InteriorItems products={products} />
            </div>
          </div>
        </div>
      </section>
      <Footer ftClass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </Fragment>
  );
};

export default InteriorShopPage;
