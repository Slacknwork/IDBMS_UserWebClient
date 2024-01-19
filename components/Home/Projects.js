"use client";

import { useEffect, useState } from "react";
import { Link } from "/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

import SectionTitle2 from "/components/Shared/SectionTitle2";
import bShape1 from "/public/images/blog/Vector3.png";
import bShape2 from "/public/images/blog/Vector4.png";

import projectTypeOptions, { projectTypeOptionsEnglish } from "/constants/enums/projectType";

import { getAdvertisementProjects } from "/services/advertisementServices";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function Projects() {
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
        pageSize: 3,
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

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <section className="wpo-blog-section section-padding">
      <div className="container">
        <SectionTitle2 subTitle={t("Projects")} MainTitle={t("OurProjects")} />
        <div className="wpo-blog-items">
          <div className="row">
            {projects.map((project) => (
              <div className="col col-lg-4 col-md-6 col-12" key={project.id}>
                <div className="wpo-blog-item" style={{ height: 650 }}>
                  <div className="wpo-blog-img">
                    {project.representImageUrl && (
                      <Image
                        src={project.representImageUrl}
                        width={500}
                        height={500}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "12rem",
                        }}
                        alt=""
                      />
                    )}
                    <div className="thumb">
                      {language === "english"
                        ? projectTypeOptionsEnglish[project.type]
                        : projectTypeOptions[project.type]
                      }
                    </div>
                  </div>
                  <div className="wpo-blog-content">
                    <ul>
                      <li>
                        {new Date(project.createdDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </li>
                    </ul>
                    <h2>
                      <Link href={`/project/demo/${project.id}`}>
                        {language === "english"
                          ? project.englishName
                          : project.name
                        }
                      </Link>
                    </h2>
                    <p dangerouslySetInnerHTML={{
                      __html: truncateText(language === 'english'
                        ? project?.englishAdvertisementDescription ?? ''
                        : project?.advertisementDescription ?? '',
                        370)
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="vector-1">
        <Image src={bShape1} alt="" />
      </div>
      <div className="vector-2">
        <Image src={bShape2} alt="" />
      </div>
    </section>
  );
}
