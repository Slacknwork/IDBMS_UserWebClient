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
              <div className="btns">
                <ul>
                  <li className="video-holder">
                    <VideoModal />
                  </li>
                  <li className="video-text">Watch Our Video</li>
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
