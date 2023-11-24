"use client";

import React, { useState } from "react";
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

import urls from "/constants/urls";

import { getParticipationByUserId } from "../../api/projectParticipationServices";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import decorIconImage from '/public/images/project-type/decor-icon-1.png'
import consIconImage from '/public/images/project-type/construction-icon-1.png'
import decorExpImage from '/public/images/project-type/decor-example-image.jpg'
import Image from "next/image";

const SubmitHandler = (e) => {
  e.preventDefault();
};

const ProjectItem = (projectDetails) => {
  const projectUrl = `${urls.project.id.getUri(1)}`;
  console.log(projectDetails)
  const project = projectDetails.projectDetails;
  return (
    <div className="container">
      <div
        className="row shadow p-4 my-3 mx-2"
        style={{ height: "28rem", backgroundColor: "white" }}
      >
        <div className="col-lg-4 my-auto">
          <div className="shop-img">
            <Image src="https://memeprod.s3.ap-northeast-1.amazonaws.com/user-template/905aee34215e8c8daa8227801d758865.png" alt="" width={0} height={0} style={{ width: '24rem', height: '24rem' }} />
          </div>
        </div>
        <div className="col-lg-8 d-flex align-items-start justify-content-between">
          <div className="shop-info my-4">
            <h3 className="">{project && project.name}</h3>
            <div className="des">
              <p style={{ textAlign: "justify" }}>Description: {project && project.description}</p>
              <p>Estimate Price: {project && project.estimatedPrice}</p>
              <p>Created Date: {project && new Date(project.createdDate).toLocaleDateString('en-GB')}</p>
            </div>
          </div>
          <div className="mt-auto d-flex gap-3">
            <div>
              <Link href={projectUrl} className="theme-btn px-4" replace>
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
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [values, setValues] = useState([]);
  const [userId, setUserId] = useState('A3C81D01-8CF6-46B7-84DF-DCF39EB7D4CF');
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getParticipationByUserId(userId);
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
  }, [userId]);

  return (
    <div className="container wpo-shop-single-section">
      <div className="row" style={{ marginTop: "3rem" }}>
        <div className="col-12">
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
            <div className="col col-3 m-auto text-center">
              <Link href="/project/booking" className="theme-btn" replace>
                Book Project
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col-12 product-info"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <Nav tabs={true}>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                All
              </NavLink>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                Decor
              </NavLink>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggle("3");
                }}
              >
                Construction
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row className="my-3">
                {values && values.map((item, index) => (
                  <Col sm="12" key={index}>
                    <ProjectItem
                      projectDetails={item.project}
                    ></ProjectItem>
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
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <p>Decor</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <p>Construction</p>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
}
