import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");

  return (
    <div className="wpo-about-area section-padding wpo-about-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12 colsm-12">
            <div
              className="wpo-about-text"
              style={{ paddingRight: "10rem", paddingLeft: "3rem" }}
            >
              <div className="wpo-about-title">
                <span>{t("AboutProject")}</span>
                <h2>{t("AboutProjectTitle")}</h2>
              </div>
              <h5>
              {t("AboutProjectSummarize")}
              </h5>
              <p>
              {t("AboutProjectDescription1")}
              </p>
              <br />
              <p>
              {t("AboutProjectDescription2")}
              </p>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="wpo-about-img" style={{ height: 650 }}>
              <Image
                src="/images/samples/home-about.jpeg"
                fill
                alt="logo"
                style={{ objectFit: "cover", padding: "2.5rem" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
