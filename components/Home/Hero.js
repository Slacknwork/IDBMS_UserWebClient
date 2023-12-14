import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="static-hero-s3">
      <div className="hero-container">
        <div className="hero-inner">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                <div className="wpo-static-hero-inner">
                  <div className="slide-title">
                    <h2 style={{ textShadow: "2px 2px 6px #000000" }}>
                      Best Furniture <br />& Decor
                    </h2>
                  </div>
                  <div className="clearfix"></div>
                  <div className="slide-btns">
                    <Link className="theme-btn-s2" href="/project">
                      Learn More
                    </Link>
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
