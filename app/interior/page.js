"use client";

import React from "react";
import PageTitle from "../../components/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import ShopProduct from "../../components/ShopProduct";
import api from "../../api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import Logo from "/public/images/logo.svg";

const InteriorShopPage = () => {
  const productsArray = api();

  const products = productsArray;

  return (
    <div>
      <Navbar Logo={Logo} hclass={"wpo-header-style-3"} />
      <PageTitle pageTitle={"Interior items"} pagesub={"Interior"} />
      <section className="wpo-shop-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ShopProduct products={products} />
            </div>
          </div>
        </div>
      </section>
      <Footer ftClass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </div>
  );
};

export default InteriorShopPage;
