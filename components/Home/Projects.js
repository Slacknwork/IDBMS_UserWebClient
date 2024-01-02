"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

import SectionTitle2 from "/components/shared/SectionTitle2";
import bShape1 from "/public/images/blog/Vector3.png";
import bShape2 from "/public/images/blog/Vector4.png";

import projectTypeOptions from "/constants/enums/projectType";

import { getAdvertisementProjects } from "/services/advertisementServices";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const projectResponse = await getAdvertisementProjects({
        page: 1,
        pageSize: 3,
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
    <section className="wpo-blog-section section-padding" id="blog">
      <div className="container">
        <SectionTitle2 subTitle={"Projects"} MainTitle={"Our Projects"} />
        <div className="wpo-blog-items">
          <div className="row">
            {projects.map((project) => (
              <div className="col col-lg-4 col-md-6 col-12" key={project.id}>
                <div className="wpo-blog-item" style={{ height: 525 }}>
                  <div className="wpo-blog-img">
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
                    <div className="thumb">
                      {projectTypeOptions[project.type]}
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
                      <Link href={`/project/${project.id}`}>
                        {project.name}
                      </Link>
                    </h2>
                    <p>{project.description}</p>
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
