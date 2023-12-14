import React from "react";
import { Link } from "/navigation";
import Image from "next/image";

import Services from "/api/service";
import Projects from "/api/project";

const Footer = (props) => {
  return (
    <footer className={`wpo-site-footer ${props.ftClass}`}>
      <div className="wpo-upper-footer">
        <div className="container">
          <div className="row">
            <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <Link
                    className="logo d-flex"
                    href="/"
                    style={{
                      width: "6rem",
                      height: "6rem",
                      position: "relative",
                    }}
                  >
                    <Image src="/images/idt-logo.jpg" fill alt="" />
                    <h2
                      className="text-white my-auto"
                      style={{ position: "relative", marginLeft: "6.75rem" }}
                    >
                      idtco.com
                    </h2>
                  </Link>
                </div>
                <ul>
                  <li>
                    <Link href="/">
                      <i className="ti-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="ti-twitter-alt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="ti-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="ti-google"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>Our Services</h3>
                </div>
                <ul>
                  {Services.slice(0, 5).map((service, srv) => (
                    <li key={srv}>
                      <Link
                        href="/service/[slug]"
                        as={`/service/${service.slug}`}
                      >
                        {service.sTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget wpo-service-link-widget">
                <div className="widget-title">
                  <h3>Contact </h3>
                </div>
                <div className="contact-ft">
                  <ul>
                    <li>
                      <i className="fi flaticon-location"></i>68D, Belsion Town
                      2365 <br /> Fna city, LH 3656, USA
                    </li>
                    <li>
                      <i className="fi flaticon-telephone"></i>+ 8 (123) 123 456
                      789 <br />+ 8 (123) 123 456 789
                    </li>
                    <li>
                      <i className="fi flaticon-email"></i>arkio@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget instagram">
                <div className="widget-title">
                  <h3>Our Gallery</h3>
                </div>
                <ul className="d-flex">
                  {Projects.slice(0, 6).map((project, srv) => (
                    <li key={srv}>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
