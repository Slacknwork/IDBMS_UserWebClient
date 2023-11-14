import React, { useState } from "react";
import Link from "next/link";
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
import api from "/api";

const SubmitHandler = (e) => {
  e.preventDefault();
};

const ProjectItem = (projectDetails) => {
  return (
    <div className="row align-items-center shadow m-4">
      <div className="col-lg-4">
        <div className="shop-img">
          <img src={projectDetails.shopImg} alt="" />
        </div>
      </div>
      <div className="col-lg-8">
        <div className="shop-info">
          <h3>{projectDetails.title}</h3>
          <span className="review_count">( 3 Customer Reviews )</span>
          <div className="clearfix"></div>
          <span className="price-num">${projectDetails.price}</span>
          <div className="des">
            <p>
              Samsa woke from troubled dreams, he found himself transformed in
              his bed into a horrible vermin. He lay on his armour-like back,
              and if he lifted his head a little he could see his brown belly,
              slightly domed and divided by arches into stiff sections. The
              bedding was hardly able to cover it and seemed ready to slide off
              any moment. His many legs, pitifully thin compared with the size
              of the rest of him.
            </p>
            <p>
              He lay on his armour-like back, and if he lifted his head a little
              he could see his brown belly, slightly domed and divided by arches
              into stiff sections. The bedding was hardly able to cover it and
              seem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectList = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="container">
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
          className="col-12"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <Nav tabs>
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
              <Row>
                <Col sm="12">
                  {api().map((product) => (
                    <ProjectItem
                      projectDetails={product}
                      key={product}
                    ></ProjectItem>
                  ))}
                </Col>
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
};

export default ProjectList;
