import { Link } from "/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("Home");

  return (
    <div className="wpo-about-area section-padding wpo-about-area">
      <div className="container">
        <div className="row align-items-center">
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
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="wpo-about-text">
              <div className="wpo-about-title">
                <span>{t("About")}</span>
                <h2>{t("AboutTitle")}</h2>
              </div>
              <p>{t("AboutDescription")}</p>
              <div className="btns">
                <Link href="/about" className="theme-btn">
                  {t("DiscoverMore")}
                </Link>
                {/*<ul>
                  <li className="video-holder">
                    <VideoModal />
                  </li>
                  <li className="video-text">Watch Our Video</li>
                </ul>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
