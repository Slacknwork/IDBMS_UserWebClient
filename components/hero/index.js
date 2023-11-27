import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="static-hero">
      <div className="hero-container">
        <div className="hero-inner">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-7 col-12">
                <div className="wpo-static-hero-inner">
                  <div
                    data-swiper-parallax="200"
                    className="slide-visible-text"
                  >
                    <h2>Unique</h2>
                  </div>
                  <div data-swiper-parallax="300" className="slide-title">
                    <h2>
                      Creating Your Future With <span>Affection</span>
                    </h2>
                  </div>
                  <div data-swiper-parallax="400" className="slide-btn">
                    <Link href="/project" className="theme-btn">
                      Discover Project
                    </Link>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="static-hero-right">
        <div className="static-hero-img">
          <div className="static-hero-img-inner">
            <img src="/images/samples/Showroom-casino.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
