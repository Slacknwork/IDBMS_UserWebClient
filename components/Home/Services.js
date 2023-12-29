import React from "react";
import SectionTitle2 from "/components/Shared/SectionTitle2";
import Image from "next/image";

const decorImgUrl = "/images/samples/home-decor-ad.jpg";
const consImgUrl = "/images/samples/home-cons-ad.jpg";

export default function Services(props) {
  return (
    <div className={`wpo-service-area-s2 section-padding ${props.ptClass}`}>
      <div className="container">
        <SectionTitle2 subTitle={"Our Projects"} MainTitle={"What We Do"} />
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wpo-service-item bg-white">
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
                <h2>Decor</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wpo-service-item bg-white">
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
                <h2>Construction</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
