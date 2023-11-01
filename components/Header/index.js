import React, { useState } from "react";
import Logo from "/public/images/logo-2.svg";
import { HiUserCircle } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "../MobileMenu/MobileMenu";
import Projects from "../../api/project";

const Header3 = (props) => {
  const [menuActive, setMenuState] = useState(false);

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <header id="header">
      <div className={`wpo-site-header ${props.hclass}`}>
        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
                  <MobileMenu />
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-6">
                <div className="navbar-header">
                  <Link className="navbar-brand" href="/">
                    <Image src={Logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-1 col-1">
                <div
                  id="navbar"
                  className="collapse navbar-collapse navigation-holder"
                >
                  <button className="menu-close">
                    <i className="ti-close"></i>
                  </button>
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    <li className="menu-item-has-children">
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link href="/project">Projects</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link href="/project/Architecture-Design">
                            Project Single
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <Link href="/interior">Interior</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 col-2">
                <div className="header-right">
                  <div className="header-right-menu-wrapper">
                    <div className="header-right-menu">
                      <HiUserCircle
                        size={40}
                        title="User"
                        style={{ cursor: "pointer", color: "white" }}
                        onClick={() => setMenuState(!menuActive)}
                      ></HiUserCircle>
                      <div
                        className={`header-right-menu-wrap ${
                          menuActive ? "right-menu-active" : ""
                        }`}
                      >
                        <button
                          onClick={() => setMenuState(!menuActive)}
                          className="right-menu-close"
                        >
                          <i className="ti-close"></i>
                        </button>
                        <h3 className="text-white mb-4">username</h3>
                        <div className="header-right-sec">
                          <div className="project-widget widget">
                            <h4 className="text-white">Our Latest Projects</h4>
                            <ul>
                              {Projects.slice(0, 6).map((project) => (
                                <li key={project}>
                                  <Link
                                    href="/project/[slug]"
                                    as={`/project/${project.slug}`}
                                  >
                                    <Image src={project.pImg} alt="" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="widget wpo-contact-widget">
                            <div className="widget-title">
                              <h3>Contact Us</h3>
                            </div>
                            <div className="contact-ft">
                              <ul>
                                <li>
                                  <i className="fi flaticon-location"></i>68D,
                                  Belsion Town 2365 <br /> Fna city, LH 3656,
                                  USA
                                </li>
                                <li>
                                  <i className="fi flaticon-telephone"></i>+ 8
                                  (123) 123 456 789 <br />+ 8 (123) 123 456 789
                                </li>
                                <li>
                                  <i className="fi flaticon-email"></i>
                                  arkio@gmail.com
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="widget newsletter-widget">
                            <div className="widget-title">
                              <h3>Newsletter</h3>
                            </div>
                            <form onSubmit={SubmitHandler}>
                              <div className="input-1">
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Email Address *"
                                  required=""
                                />
                                <div className="submit clearfix">
                                  <button type="submit">
                                    <i className="ti-email"></i>
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header3;
