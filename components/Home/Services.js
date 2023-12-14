import React from "react";
import SectionTitle3 from "/components/Shared/SectionTitle3";
import Image from "next/image";

const decorImgUrl = "/images/samples/home-decor-ad.jpg";
const consImgUrl = "/images/samples/home-cons-ad.jpg";

export default function Services(props) {
  return (
    <div className={`wpo-service-area-s3 section-padding ${props.ptClass}`}>
      <div className="container">
        <SectionTitle3 subTitle={"Our Services"} MainTitle={"What We Do"} />
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wpo-service-item">
              <div
                className="wpo-service-img"
                style={{
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Image src={decorImgUrl} fill quality={100} priority alt="" />
              </div>
              <div className="wpo-service-text">
                <h2 style={{ color: "white" }}>Decor</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wpo-service-item">
              <div
                className="wpo-service-img"
                style={{
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Image src={consImgUrl} fill quality={100} priority alt="" />
              </div>
              <div className="wpo-service-text">
                <h2 style={{ color: "white" }}>Construction</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
