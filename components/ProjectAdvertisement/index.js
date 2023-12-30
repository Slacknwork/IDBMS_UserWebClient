import { useState, useEffect } from "react";
import { Link } from "/navigation";
import Image from "next/image";

import projectTypeOptions from "/constants/enums/projectType";

import { getAdvertisementProjects } from "/api/advertisementServices";

import SectionTitle2 from "/components/shared/SectionTitle2";

export default function ProjectAdvertisement() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const projectResponse = await getAdvertisementProjects({
        page: 1,
        pageSize: 6,
      });
      setProjects(projectResponse.list);
    } catch (error) {
      toast.error("Error loading projects!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="wpo-project-area-s2 section-padding">
      <div className="container">
        <SectionTitle2 subTitle={"Featured Works"} MainTitle={"Our Projects"} />
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
                            <div className="left-border"></div>
                            <div className="right-border"></div>
                          </div>
                          <div className="wpo-project-text">
                            <h2>
                              <Link href={`/project/demo/${project.id}`}>
                                {projectTypeOptions[project.type]}
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
