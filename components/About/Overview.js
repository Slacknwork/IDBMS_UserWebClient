import React from "react";
import { Link } from "/navigation";
import abimg from "/public/images/samples/about-overview.jpg";
import abimg2 from "/public/images/samples/about-overview-2.png";
import Image from "next/image";
import VideoModal from "/components/ModalVideo/VideoModal";
import { useTranslations } from "next-intl";

const About2 = (props) => {
  const t = useTranslations("About");

  return (
    <div className="wpo-about-area-s2 section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="wpo-about-img">
              <div className="wpo-about-img-left">
                <Image
                  src={abimg}
                  style={{ height: 460, width: 350, objectFit: "cover" }}
                  unoptimized
                  alt=""
                />
                <div className="wpo-about-img-text">
                  <h2>20+</h2>
                  <p>{t("YearsExp")}</p>
                </div>
              </div>
              <div className="wpo-about-img-right">
                <Image
                  src={abimg2}
                  style={{ height: 460, width: 350, objectFit: "cover" }}
                  unoptimized
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 colsm-12">
            <div className="wpo-about-text">
              <div className="wpo-about-title">
                <span>{t("AboutUs")}</span>
                <h2>{t("AboutUsTitle")}</h2>
              </div>
              <h5>
              {t("AboutUsSummarize")}
              </h5>
              <p>
              {t("AboutUsDescription")}
              </p>
              <div className="btns">
                <ul>
                  <li className="video-holder">
                    <VideoModal />
                  </li>
                  <li className="video-text">{t("VideoText")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About2;
