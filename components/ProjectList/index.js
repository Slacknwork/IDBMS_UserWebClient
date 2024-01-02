import { useState, useEffect } from "react";
import { Link } from "/navigation";
import { useSearchParams, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import { toast } from "react-toastify";

import { getParticipationsByUserId } from "/services/projectParticipationServices";

import projectStatusOptions from "/constants/enums/projectStatus";

export default function ProjectList() {
  // CONSTANTS

  // INIT
  const user = useSelector((state) => state.user);
  const [participations, setParticipations] = useState([]);

  // FETCH DATA
  const fetchParticipations = async () => {
    try {
      const participations = await getParticipationsByUserId({
        userId: user.id,
      });
      setParticipations(participations.list);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Dự án tham gia!");
    }
  };

  useEffect(() => {
    fetchParticipations();
  }, []);

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row" style={{ marginBottom: 0 }}>
          <div className={`col col-lg-4 col-12`}>
            <div className="blog-sidebar">
              <div className="widget search-widget">
                <form>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Post.."
                    />
                    <button type="submit">
                      <i className="ti-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="widget category-widget">
                <h3>Categories</h3>
                <ul>
                  {projectStatusOptions.map((status, index) => (
                    <li key={status}>
                      <Link href="/service/1">
                        {status}
                        <span>{index}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="wpo-contact-widget widget">
                <h2>
                  How We Can <br /> Help You!
                </h2>
                <p>
                  labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                  gravida. Risus commodo viverra maecenas accumsan lacus vel
                  facilisis.{" "}
                </p>
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className={`col col-lg-8 col-12`}>
            <div className="wpo-blog-content">
              {participations &&
                participations.map((participation) => (
                  <div
                    className="row post"
                    style={{
                      borderBottom: "1px solid lightgrey",
                    }}
                    key={participation.id}
                  >
                    <div className="col-12 col-lg-4 my-auto">
                      <Image
                        src="/images/project-type/undefined-icon-1.png"
                        width={500}
                        height={500}
                        className="p-5"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </div>
                    <div className="col-12 col-lg-8 flex-col align-content-between">
                      <div>
                        <div className="entry-meta">
                          <ul>
                            <li>
                              <i className="fi ti-user"></i> By{" "}
                              <Link href="/">aaa</Link>{" "}
                            </li>
                            <li>
                              <i className="fi flaticon-calendar"></i>{" "}
                              {new Date(
                                participation.project?.createdDate
                              ).toLocaleDateString("en-GB")}
                            </li>
                          </ul>
                        </div>
                        <div className="entry-details">
                          <h3>
                            <Link
                              href={`/project/${participation.project?.id}`}
                            >
                              {participation.project?.name}
                            </Link>
                          </h3>
                          <p>
                            {participation.project?.description ||
                              "No description"}
                          </p>
                        </div>
                      </div>

                      <Link
                        className="d-flex justify-content-end align-items-end"
                        href={`/project/${participation.project?.id}`}
                      >
                        <div className="d-flex">
                          <div className="theme-btn px-4">Details</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
