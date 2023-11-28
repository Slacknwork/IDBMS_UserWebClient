"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "/navigation";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { toast } from "react-toastify";
import Image from "next/image";
import { useSelector } from "react-redux";

import urls from "/constants/urls";

import { getParticipationByUserId } from "/api/projectParticipationServices";

import { TbHomeSearch } from "react-icons/tb";

const decorIconImageUrl = "/images/project-type/decor-icon-1.png";
const consIconImageUrl = "/images/project-type/construction-icon-1.png";
const undefinedIconImageUrl = "/images/project-type/undefined-icon-1.png";

const SubmitHandler = (e) => {
  e.preventDefault();
};

function NoProjectView() {
  return (
    <section className="error-404-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-xs-12">
            <div className="content clearfix">
              <div className="error">
                <TbHomeSearch size={200} color="#0D0845" />
              </div>
              <div className="error-message">
                <h3>No Projects!</h3>
                <p>
                  You currently do not have any projects. Book a project to
                  start!
                </p>
                <div className="row">
                  <div className="col col-lg-12 col-12">
                    <div className="d-flex justify-content-center">
                      <div className="d-flex">
                        <Link href="/project/booking" className="theme-btn">
                          <h4
                            className="pt-2 pb-1"
                            style={{
                              color: "white",
                              paddingLeft: "6rem",
                              paddingRight: "6rem",
                            }}
                          >
                            Book Project
                          </h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ProjectItem = (projectDetails) => {
  const item = projectDetails.project;
  const projectUrl = `${urls.project.id.getUri(item.id)}`;
  return (
    <div className="container hover:scale-105">
      <div
        className="row shadow p-4 my-3 mx-2"
        style={{ height: "28rem", backgroundColor: "white" }}
      >
        <div className="col-lg-4 my-auto d-flex justify-content-center">
          <div className="shop-img">
            <Image
              src={item && item.projectCategory?.iconImageUrl}
              alt=""
              width={0}
              height={0}
              style={{ width: "24rem", height: "24rem", objectFit: "cover" }}
              unoptimized={true}
            />
          </div>
        </div>
        <div className="col-lg-8 d-flex align-items-start justify-content-between">
          <div className="shop-info my-4">
            <h3 className="">{item && item.name}</h3>
            <div className="des">
              <p style={{ textAlign: "justify" }}>
                Description: {item && item.description}
              </p>
              <p>
                {item
                  ? item.finalPrice
                    ? `Final Price: ${item.finalPrice.toLocaleString(
                        "vi-VN"
                      )} VND`
                    : item.estimatedPrice
                    ? `Estimate Price: ${item.estimatedPrice.toLocaleString(
                        "vi-VN"
                      )} VND`
                    : "Price information not available"
                  : "Item information not available"}
              </p>
              <p>
                Created Date:{" "}
                {item && new Date(item.createdDate).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <div className="mt-auto d-flex gap-3">
            <div>
              <Link href={projectUrl} className="theme-btn px-4">
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectList() {
  const user = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [values, setValues] = useState([]);
  const [userId, setUserId] = useState(user.id);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getParticipationByUserId(userId);
          setValues(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  }, [userId]);

  return (
    <div>
      {values && values.length > 0 ? (
        <div className="container wpo-shop-single-section">
          <div className="row">
            <div
              className="col-12 col-lg-12 product-info"
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              <div className="row">
                <div className="col col-lg-8 col-12">
                  <Nav tabs={true}>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        <h4
                          style={{
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          In progress
                        </h4>
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        <h4
                          style={{
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          Completed
                        </h4>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <div className="col col-12 col-lg-4 my-auto">
                  <div className="d-flex justify-content-end">
                    <div className="d-flex">
                      <Link
                        href="/project/booking"
                        className="theme-btn"
                        style={{
                          paddingLeft: "6rem",
                          paddingRight: "6rem",
                          paddingTop: "1.25rem",
                          paddingBottom: "1.25rem",
                        }}
                      >
                        Book Project
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row className="my-3">
                    {values &&
                      values.map((item, index) => (
                        <Col sm="12" key={item.project.id}>
                          <ProjectItem project={item.project} />
                        </Col>
                      ))}
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <div
                    className="row"
                    style={{ marginLeft: "8rem", marginRight: "8rem" }}
                  >
                    <div className="col col-9 blog-sidebar">
                      <div className="widget search-widget">
                        <form onSubmit={SubmitHandler}>
                          <div className="">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Post.."
                            />
                            <button type="submit">
                              <i className="ti-search"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <Row className="my-3">
                    {values &&
                      values
                        .filter((item) => item.project.type === 0)
                        .map((item, index) => (
                          <Col sm="12" key={index}>
                            <ProjectItem key={index} project={item.project} />
                          </Col>
                        ))}
                    <Col sm="12">
                      <div className="pagination-wrapper pagination-wrapper-center">
                        <ul className="pg-pagination">
                          <li>
                            <a href="#" aria-label="Previous">
                              <i className="ti-angle-left"></i>
                            </a>
                          </li>
                          <li className="active">
                            <a href="#">1</a>
                          </li>
                          <li>
                            <a href="#">2</a>
                          </li>
                          <li>
                            <a href="#">3</a>
                          </li>
                          <li>
                            <a href="#" aria-label="Next">
                              <i className="ti-angle-right"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      ) : (
        <NoProjectView></NoProjectView>
      )}
    </div>
  );
}
