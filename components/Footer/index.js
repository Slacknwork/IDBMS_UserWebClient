import { useState, useEffect } from "react";
import { Link } from "/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

import { getAdvertisementProjects } from "/services/advertisementServices";
import { useTranslations } from "next-intl";

export default function Footer(props) {
  const [projects, setProjects] = useState([]);
  const t = useTranslations("Footer");
  const e = useTranslations("Error");

  const fetchProjects = async () => {
    try {
      const projectResponse = await getAdvertisementProjects({
        page: 1,
        pageSize: 6,
      });
      setProjects(projectResponse.list);
    } catch (error) {
      toast.error(e("ErrorLoadingProjects"));
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <footer className={`wpo-site-footer ${props.ftClass}`}>
      <div className="wpo-upper-footer">
        <div className="container">
          <div className="row">
            <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <Link
                    className="logo d-flex"
                    href="/"
                    style={{
                      width: "6rem",
                      height: "6rem",
                      position: "relative",
                    }}
                  >
                    <Image src="/images/idt-logo.jpg" fill alt="" />
                    <h2
                      className="text-white my-auto"
                      style={{
                        position: "relative",
                        marginLeft: "6.75rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      IDT Décor
                    </h2>
                  </Link>
                </div>
                <ul>
                  <li>
                    <Link href="/">
                      <i className="ti-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="ti-twitter-alt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="ti-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="ti-google"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>{t("OurServices")}</h3>
                </div>
                <ul>
                  <li>
                    <Link href={`/about/decor`}>{t("Decor")}</Link>
                  </li>
                  <li>
                    <Link href={`/about/construction`}>{t("Construction")}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget wpo-service-link-widget">
                <div className="widget-title">
                  <h3>{t("Contact")} </h3>
                </div>
                <div className="contact-ft">
                  <ul>
                    <li>
                      <i className="fi flaticon-location"></i>{t("Address")} 
                    </li>
                    <li>
                      <i className="fi flaticon-telephone"></i>+84 983 802 117
                      789 <br />
                      +84 949 802 117
                    </li>
                    <li>
                      <i className="fi flaticon-email"></i>tuanidtco@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget instagram">
                <div className="widget-title">
                  <h3>{t("OurGallery")}</h3>
                </div>
                <ul className="d-flex">
                  {projects.slice(0, 6).map((project) => (
                    <li key={project.id}>
                      <Link href={`/project/demo/${project.id}`}>
                        {project.representImageUrl && (
                          <Image
                            src={project.representImageUrl}
                            width={640}
                            height={470}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: 81.36,
                            }}
                            alt=""
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
