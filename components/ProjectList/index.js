import { useState, useEffect } from "react";
import { Link, useRouter } from "/navigation";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import { CircularProgress, Stack } from "@mui/material";
import { toast } from "react-toastify";

import { getParticipationsByUserId } from "/services/projectParticipationServices";
import { getProjectStatusByUserId } from "/services/projectServices";

import projectStatusOptions from "/constants/enums/projectStatus";

import Search from "/components/Shared/Search";
import { useTranslations } from "next-intl";

export default function ProjectList() {
  // CONSTANTS

  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.customer);
  const t = useTranslations("ProjectListPage");

  // SEARCH
  const searchQuery = "search";

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
  const [loading, setLoading] = useState(true);
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

  const fetchData = async () => {
    setLoading(true);
    Promise.all([fetchProjectStatusCount(), fetchParticipations()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row" style={{ marginBottom: 0 }}>
          <div className={`col col-lg-4 col-12`}>
            <div className="blog-sidebar">
              <div className="mb-5">
                <Search placeholder={t("Search")}></Search>
              </div>
              <div className="widget category-widget">
                <h3>{t("Status")}</h3>
                <ul>
                  <li>
                    <a onClick={() => setStatus(0)}>
                    {t("All")}
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
                {t("ContactText1")} <br /> {t("ContactText2")}
                </h2>
                <p>
                {t("ContactText3")}
                </p>
                <Link href="/contact">{t("ContactUs")}</Link>
              </div>
            </div>
          </div>
          <div className={`col col-lg-8 col-12`}>
            <div className="wpo-blog-content">
              {loading ? (
                <Stack sx={{ height: "20rem" }}>
                  <CircularProgress
                    sx={{ m: "auto", color: "#CAAD06" }}
                    size="4rem"
                  ></CircularProgress>
                </Stack>
              ) : (
                participations &&
                participations.length > 0 &&
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
                              <i className="fi ti-user"></i> {t("By")}{" "}
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
                          <h3 style={{ fontSize: 26 }}>
                            <Link
                              href={`/project/${participation.project?.id}`}
                            >
                              {participation.project?.name}
                            </Link>
                          </h3>

                          <p style={{ fontSize: 18 }}>
                            {participation.project?.description ||
                              t("NoDescription")}
                          </p>
                        </div>
                      </div>

                      <Link
                        className="d-flex justify-content-end align-items-end"
                        href={`/project/${participation.project?.id}`}
                      >
                        <div className="d-flex">
                          <div className="theme-btn px-4">{t("Details")}</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
