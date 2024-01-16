"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { CircularProgress, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import { getCommentsByProjectId } from "/services/commentServices";

import NavButton from "/components/Shared/NavButton";
import Search from "/components/Shared/Search";

import "./style.css";

export default function TaskCommentsPage() {
  // CONSTANTS
  const o = useTranslations("ProjectDetails_Overview");
  const searchQuery = "search";
  const typeQuery = "type";
  const statusQuery = "status";
  const pageQuery = "page";

  const defaultPage = 1;
  const defaultPageSize = 5;

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.customer);

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const projectId = params.id;
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = defaultPageSize;

      const comments = await getCommentsByProjectId({
        projectId,
        page,
        pageSize,
      });
      setComments(comments.list);
    } catch (error) {
      toast.error("Error: Comments!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchComments()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <NavButton
            url={`/project/${params.id}`}
            label={o("Overview")}
          ></NavButton>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <h3 className="my-auto">Comments</h3>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6 col-12">
          <Search placeholder="Search comment..."></Search>
        </div>
        <div className="col col-lg-12 col-12">
          <div className="review">
            <div className="review-section mt-4" style={{ minHeight: "30rem" }}>
              {loading ? (
                <Stack sx={{ height: "30rem" }}>
                  <CircularProgress
                    sx={{ m: "auto", color: "#CAAD06" }}
                    size="4rem"
                  ></CircularProgress>
                </Stack>
              ) : comments && comments.length > 0 ? (
                <ul>
                  <li>
                    <div className="review-content">
                      <div className="reviewer-say">
                        <h3>
                          Cobus Besten <span>June 7’2022</span>
                        </h3>
                        <p>
                          Lorem is simply dummy text of the printing and
                          typesetting industry. Lorem has been the industry's.
                        </p>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div className="review-content">
                          <div className="reviewer-say">
                            <h3>
                              James Koster <span>June 7 2022</span>
                            </h3>
                            <p>
                              Lorem is simply dummy text of the printing and
                              typesetting industry. Lorem has been the
                              industry's.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              ) : (
                <Stack sx={{ height: "30rem" }}>
                  <p style={{ margin: "auto", textAlign: "center" }}>
                    No data.
                  </p>
                </Stack>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
