import { useState, useEffect } from "react";
import { Link, useRouter } from "/navigation";
import { useSearchParams, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import { toast } from "react-toastify";

import { getParticipationsByUserId } from "/services/projectParticipationServices";
import { getProjectStatusByUserId } from "/services/projectServices";

import projectStatusOptions from "/constants/enums/projectStatus";

export default function ProjectList() {
  // CONSTANTS

  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.customer);

  // SEARCH
  const searchQuery = "search";
  const [search, setSearch] = useState(searchParams.get(searchQuery) ?? "");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    search
      ? searchParams.set(searchQuery, search)
      : searchParams.delete(searchQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), undefined, { scroll: false });
  };

  // FILTER BY STATUS
  const statusQuery = "status";
  const [status, setStatus] = useState(searchParams.get(statusQuery));
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    status
      ? searchParams.set(statusQuery, status)
      : searchParams.delete(statusQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), undefined, { scroll: false });
  }, [status]);

  // FETCH DATA
  const [participations, setParticipations] = useState([]);

  const fetchParticipations = async () => {
    try {
      const search = searchParams.get(searchQuery) ?? "";
      const status = searchParams.get(statusQuery) ?? "";
      const participations = await getParticipationsByUserId({
        userId: user.id,
        search,
        status,
      });
      setParticipations(participations.list);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Dự án tham gia!");
    }
  };

  const fetchProjectStatusCount = async () => {
    try {
      const projectStatusCount = await getProjectStatusByUserId({
        userId: user.id,
      });
    } catch (error) {
      toast.error("Lỗi dữ liệu: Trạng thái dự án!");
    }
  };

  useEffect(() => {
    Promise.all([fetchProjectStatusCount(), fetchParticipations()]);
  }, [searchParams]);

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row" style={{ marginBottom: 0 }}>
          <div className={`col col-lg-4 col-12`}>
            <div className="blog-sidebar">
              <div className="widget search-widget">
                <form onSubmit={onSearchSubmit}>
                  <div>
                    <input
                      type="text"
                      value={search}
                      onChange={onSearchChange}
                      className="form-control"
                      placeholder="Search Projects..."
                    />
                    <button type="submit">
                      <i className="ti-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="widget category-widget">
                <h3>Status</h3>
                <ul>
                  <li>
                    <a onClick={() => setStatus(0)}>
                      All
                      <span>0</span>
                    </a>
                  </li>
                  {projectStatusOptions.map(
                    (status, index) =>
                      index > 1 && (
                        <li key={status}>
                          <a onClick={() => setStatus(index)}>
                            {status}
                            <span>{index}</span>
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </div>
              <div className="wpo-contact-widget widget">
                <h2>
                  How We Can <br /> Help You!
                </h2>
                <p>
                  Leave us your information so we can contact and start up a
                  project!
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
