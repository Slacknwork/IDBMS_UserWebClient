"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { Avatar, CircularProgress, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import "moment/locale/vi";

import { getCommentsByProjectId } from "/services/commentServices";

import timezone from "/constants/timezone";

import NavButton from "/components/Shared/NavButton";
import Search from "/components/Shared/Search";

import { getColorForAvatar, getAvatarContent } from "/utils/avatar";

import "./style.css";

export default function TaskCommentsPage() {
  moment.tz.setDefault(timezone.momentDefault);
  moment.locale(timezone.momentLocale);
  // CONSTANTS
  const o = useTranslations("ProjectDetails_Overview");
  const t = useTranslations("ProjectDetails_Comment");
  const e = useTranslations("Error");
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
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = defaultPageSize;

      const comments = await getCommentsByProjectId({
        projectId,
        search,
        page,
        pageSize,
      });
      setComments(comments.list);
    } catch (error) {
      toast.error(e("ErrorComment"));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchComments()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

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
          <h3 className="my-auto">{t("Comment")}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6 col-12">
          <Search placeholder={t("SearchComment")}></Search>
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
                  {comments.map((comment) => (
                    <li key={comment.id}>
                      <div
                        className="review-content d-flex"
                        style={{ padding: 0 }}
                      >
                        <div
                          className="d-flex"
                          style={{ width: "75%", padding: "2rem" }}
                        >
                          <div style={{ width: "5%" }}>
                            <Avatar
                              sx={{
                                m: "auto",
                                bgcolor: getColorForAvatar(comment?.user?.name),
                                width: 50,
                                height: 50,
                              }}
                              alt={comment?.user?.name}
                            >
                              <h6
                                className="my-auto"
                                style={{ color: "white" }}
                              >
                                {getAvatarContent(comment?.user?.name)}
                              </h6>
                            </Avatar>
                          </div>
                          <div
                            className="reviewer-say"
                            style={{ width: "95%" }}
                          >
                            <h3 style={{ whiteSpace: "nowrap" }}>
                              {comment?.user?.name}{" "}
                              <span>
                                {comment.createdTime &&
                                  moment(comment.createdTime).format("lll")}
                              </span>
                            </h3>
                            <p>{comment?.content}</p>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "25%",
                            padding: "2rem",
                            textAlign: "start",
                          }}
                        >
                          <h6 style={{ margin: 0 }}>
                            {comment?.projectTask?.code}
                          </h6>
                          <p style={{ margin: 0, lineHeight: "1.5rem" }}>
                            {comment?.projectTask?.name}
                          </p>
                        </div>
                      </div>
                      <ul style={{ marginLeft: "8rem" }}>
                        {comment?.commentReplies &&
                          comment?.commentReplies.length > 0 &&
                          comment?.commentReplies.map((commentReply) => (
                            <li key={commentReply.id}>
                              <div className="review-content">
                                <Avatar
                                  sx={{
                                    bgcolor: getColorForAvatar(
                                      commentReply?.user?.name
                                    ),
                                    width: 50,
                                    height: 50,
                                  }}
                                  alt={commentReply?.user?.name}
                                >
                                  <h6
                                    className="my-auto"
                                    style={{ color: "white" }}
                                  >
                                    {getAvatarContent(commentReply?.user?.name)}
                                  </h6>
                                </Avatar>
                                <div className="reviewer-say">
                                  <h3>
                                    {commentReply?.user?.name}{" "}
                                    <span>
                                      {commentReply.createdTime &&
                                        moment(commentReply.createdTime).format(
                                          "lll"
                                        )}
                                    </span>
                                  </h3>
                                  <p>{commentReply?.content}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <Stack sx={{ height: "30rem" }}>
                  <p style={{ margin: "auto", textAlign: "center" }}>
                  {t("NoComment")}
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
