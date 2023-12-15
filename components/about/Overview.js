import React from "react";
import Link from "next/link";
import abimg from "/public/images/samples/about-overview.jpg";
import yearsOfExpBg from "/public/images/about-shape3.png";
import Image from "next/image";

export default function Overview() {
  return (
    <div className="wpo-about-area-s4 section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="wpo-about-img">
              <div style={{ height: 595, width: 500 }}>
                <Image
                  src={abimg}
                  fill
                  quality={100}
                  priority
                  unoptimized={true}
                  alt="logo"
                  style={{ objectFit: "cover", padding: "3rem" }}
                />
              </div>

              <div className="wpo-about-img-text">
                <h2>20+</h2>
                <p>Years of Experience</p>
                <div className="about-shape">
                  <Image src={yearsOfExpBg} alt="" />
                </div>
              </div>
              <div className="left-shape">
                <div className="square-shape"></div>
                <div className="shape-top">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="shape-left">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 colsm-12">
            <div className="wpo-about-text">
              <div className="wpo-about-title">
                <span>About Us</span>
                <h2>About our IDT studio</h2>
              </div>
              <h5>
                Specializes in architectural design, interior design and
                construction, construction and supply of furniture.
              </h5>
              <p>
                Our company IDT is a professional company in the field of
                architectural design, interior decoration, construction.Founded
                in 2002 up to now, our company with a long experience with a
                team of architects, engineers, workers, through many domestic
                and foreign projects, our company will meet the requirements of
                customers. On the other hand, IDT company also invests in a
                factory of more than 1000 square meters at Town Street 48, Thanh
                Xuan Ward, District 12, with full modern machinery imported from
                European countries, will produce high quality products with
                prestige. on the market.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="invisible-title1">
        <h2>About</h2>
      </div>
    </div>
  );
}
