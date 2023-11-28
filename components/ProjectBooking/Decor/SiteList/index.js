"use client";

import React from "react";
import { Link, useRouter } from "/navigation";

import { useSelector, useDispatch } from "react-redux";
import { addSite } from "/store/reducers/draftProject";

import urls from "/constants/urls";
import Image from "next/image";

const SiteItem = ({ site, index }) => {
  const siteDetailsUrl = urls.project.booking.decor.site.siteNo.getUri(index);

  return (
    <div className="container">
      <div
        className="d-flex justify-content-between shadow p-4 my-4 mx-1"
        style={{ minHeight: "18rem" }}
      >
        <div className="d-flex">
          <div className="my-auto" style={{ marginRight: "1.25rem" }}>
            <div
              className="shop-img"
              style={{ width: "14rem", height: "14rem", position: "relative" }}
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/7100/7100358.png"
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="shop-info my-auto">
              <h3 className="">{site.name}</h3>
              <div className="des">
                <p>Address: {site.address}</p>
                <p>Purpose: {site.usePurpose}</p>
                <p>
                  Total area: {site.totalArea} m<sup>2</sup>
                </p>
                <p>
                  Total price: {site.totalPrice.toLocaleString("vi-VN")} VND
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto d-flex gap-3">
          <div>
            <Link href={siteDetailsUrl} className="theme-btn px-4">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SiteList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const draftProject = useSelector((state) => state.draftProject);
  const sites = draftProject.sites;

  function onAddSiteClick() {
    dispatch(addSite());
    router.push(urls.project.booking.decor.site.siteNo.getUri(sites.length));
  }

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Project Sites</h3>
              <div className="d-flex">
                <button
                  type="button"
                  onClick={onAddSiteClick}
                  className="theme-btn-s4 px-4 py-2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "30rem",
              overflowY: "scroll",
            }}
          >
            {sites.map((site, index) => (
              <SiteItem site={site} index={index} key={site.id}></SiteItem>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
