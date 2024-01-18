"use client";

import { useState, useEffect } from "react";
import { Link } from "/navigation";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslations } from "next-intl";


import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import { getInteriorItemBookmarksByUserId } from "/services/bookmarkServices";
import { useSelector } from "react-redux";
import { deleteInteriorItemBookmark } from "/services/bookmarkServices";

const theme = createTheme({
  palette: {
    primary: {
      main: "#caad06",
    },
  },
});

export default function InteriorBookmarksPage() {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";
  const defaultPageSize = 6;
  const defaultPage = 1;
  const defaultCategoryPageSize = 8;

  // INIT
  const t = useTranslations("InteriorItems");
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.customer);

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [count, setCount] = useState(0);
  const params = useParams();

  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
        ? "vietnamese"
        : "";
  const fetchBookmarks = async () => {
    try {
      const name = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = defaultPageSize;

      const bookmarks = await getInteriorItemBookmarksByUserId({ userId: user.id, name, page, pageSize });
      console.log(bookmarks)

      setBookmarks(bookmarks.list);
      setCount(bookmarks.totalPage);
    } catch (error) {
      toast.error("Error: Bookmarks!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchBookmarks()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      const response = await deleteInteriorItemBookmark(bookmarkId);
      toast.success("Xóa thành công!");
      console.log(response);
      await fetchData()
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <div className="container wpo-shop-section my-4">
      <div className="row d-flex align-bookmarks-center justify-content-center">
        <div className="col col-lg-6 col-12 ">
          <div className="w-100 p-5">
            <Search placeholder={t("Search")} className="w-100"></Search>
          </div>
        </div>
        {count === 0 && (
          <div className="col col-lg-12 col-12 d-flex align-bookmarks-center justify-content-center" style={{ height: '200px' }}>
            <div className="text-center" style={{ lineHeight: '200px', fontSize: '24px' }}>
              No bookmark
            </div>
          </div>
        )}

        <div className="col col-lg-12 col-12">
          <div>
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="grid"
                style={{ backgroundColor: "white" }}
              >
                <Image
                  src={bookmark?.interiorItem?.imageUrl ?? ""}
                  alt=""
                  width={0}
                  height={0}
                  style={{
                    width: "24rem",
                    height: "24rem",
                    objectFit: "cover",
                  }}
                  unoptimized={true}
                />
                <div className="details">
                  <h3 style={{ height: "55px", overflowY: "auto" }}>
                    {language === "english"
                      ? (bookmark?.interiorItem?.englishName) ?? (bookmark?.interiorItem?.name)
                      : bookmark?.interiorItem && bookmark?.interiorItem?.name
                    }
                  </h3>
                  <div className="price">
                    <span>
                      {bookmark?.interiorItem &&
                        bookmark?.interiorItem?.estimatePrice &&
                        bookmark?.interiorItem?.estimatePrice.toLocaleString("en-US") + " VND"}
                    </span>
                  </div>
                  <div className="add-to-cart">
                    <button
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      title="Remove to Favorite"
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                    >
                      {t("Remove")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination count={count}></Pagination>
        </div>
      </div>
    </div>
  );
}
