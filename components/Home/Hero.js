import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Hero2 = (props) => {
  var settings = {
    dots: false,
    arrows: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
  };
  const t = useTranslations("Home");

  return (
    <section className="wpo-box-style">
      <div className={`wpo-hero-slider wpo-hero-style-2 ${props.heroClass}`}>
        <div className="hero-container">
          <div className="hero-wrapper">
            <Slider {...settings}>
              <div className="hero-slide">
                <div
                  className="slide-inner"
                  style={{
                    backgroundImage: `url(${"/images/samples/hero1.jpg"})`,
                  }}
                >
                  <div className="container-fluid">
                    <div className="slide-content">
                      <div className="slide-title">
                        <h2>{t("HeroTitle")}</h2>
                      </div>
                      <div className="slide-title-sub">
                        <p>
                        {t("HeroDescription")}
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div className="slide-btns d-flex">
                        <Link href="/about" className="theme-btn">
                        {t("DiscoverMore")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-slide">
                <div
                  className="slide-inner"
                  style={{
                    backgroundImage: `url(${"/images/samples/hero2.jpeg"})`,
                  }}
                >
                  <div className="container-fluid">
                    <div className="slide-content">
                      <div className="slide-title">
                        <h2>{t("HeroTitle")}</h2>
                      </div>
                      <div className="slide-title-sub">
                        <p>
                        {t("HeroDescription")}
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div className="slide-btns d-flex">
                        <Link href="/about" className="theme-btn">
                        {t("DiscoverMore")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-slide">
                <div
                  className="slide-inner"
                  style={{
                    backgroundImage: `url(${"/images/samples/hero3.jpeg"})`,
                  }}
                >
                  <div className="container-fluid">
                    <div className="slide-content">
                      <div className="slide-title">
                        <h2>{t("HeroTitle")}</h2>
                      </div>
                      <div className="slide-title-sub">
                        <p>
                        {t("HeroDescription")}
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div className="slide-btns d-flex">
                        <Link href="/about" className="theme-btn">
                        {t("DiscoverMore")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
