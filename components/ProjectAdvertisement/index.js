import { useState, useEffect } from "react";
import { Link } from "/navigation";
import Image from "next/image";

import projectTypeOptions, {projectTypeOptionsEnglish} from "/constants/enums/projectType";

import { getAdvertisementProjects } from "/services/advertisementServices";
import { useTranslations } from "next-intl";

import SectionTitle2 from "/components/Shared/SectionTitle2";
import { useParams } from "next/navigation";

export default function ProjectAdvertisement() {
  const [projects, setProjects] = useState([]);
  const t = useTranslations("Home");
  const e = useTranslations("Error");
  const params = useParams();

  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
      ? "vietnamese"
      : "";
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
    <div className="wpo-project-area-s2 section-padding">
      <div className="container">
        <SectionTitle2 subTitle={t("FeaturedWorks")} MainTitle={t("OurProjects")} />
        <div className="row align-items-center">
          <div className="wpo-project-wrap">
            <div className="sortable-gallery">
              <div className="row">
                <div className="col-lg-12">
                  <div className="project-grids gallery-container clearfix">
                    {projects.map((project) => (
                      <div className="grid" key={project.id}>
                        <div className="wpo-project-item">
                          <div className="wpo-project-img">
                            {project.representImageUrl ? (
                              <Image
                                src={project.representImageUrl}
                                width={500}
                                height={500}
                                unoptimized
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "20rem",
                                }}
                                alt=""
                              />
                            ) : (
                              <div style={{ width: "100%", height: "20rem" }} />
                            )}
                            <div className="left-border"></div>
                            <div className="right-border"></div>
                          </div>
                          <div className="wpo-project-text">
                            <h2>
                              <Link href={`/project/demo/${project.id}`}>
                              {language === "english"
                                ? projectTypeOptionsEnglish[project.type]
                                : projectTypeOptions[project.type]
                              }
                              </Link>
                            </h2>
                            <span>{project.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
