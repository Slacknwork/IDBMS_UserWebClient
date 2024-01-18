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

import { getAllInteriorItems } from "/services/interiorItemServices";
import { getAllInteriorItemCategories } from "/services/interiorItemCategoryServices";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import { createInteriorItemBookmark } from "/services/bookmarkServices";
import { useSelector } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#caad06",
    },
  },
});

export default function InteriorItemsPage({ success }) {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";
  const defaultPageSize = 6;
  const defaultPage = 1;
  const defaultCategoryPageSize = 8;

  // INIT
  const t = useTranslations("InteriorItems");
  const e = useTranslations("Error");
  const searchParams = useSearchParams();

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const params = useParams();
  const user = useSelector((state) => state.customer);

  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
        ? "vietnamese"
        : "";
  const fetchItems = async () => {
    try {
      const search = searchParams.get(searchQuery) ?? "";
      const pageNo = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = defaultPageSize;

      const items = await getAllInteriorItems({ search, pageNo, pageSize, itemType: 0 });
      setItems(items.list);
      setCount(items.totalPage);
    } catch (error) {
      toast.error(e("ItemsError"));
    }
  };

  const fetchCategories = async () => {
    try {
      const pageNo = defaultPage;
      const pageSize = defaultCategoryPageSize;
      const categories = await getAllInteriorItemCategories({
        pageNo,
        pageSize,
      });
      setCategories(categories.list);
    } catch (error) {
      toast.error(e("ItemCategoriesError"));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchItems(), fetchCategories()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const handleCreateBookmark = async (itemId) => {
    try {
      const response = await createInteriorItemBookmark({ userId: user.id, interiorItemId: itemId });
      toast.success("Thêm thành công!");
      console.log(response);
      // success(true);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <div className="container wpo-shop-section my-4">
      <section className="wpo-contact-pg-section">
        <div className="container ">
          <div className="office-info p-0" style={{ marginBottom: "3rem" }}>
            <div className="row gx-5 gy-4">
              {categories &&
                categories.map((item, index) => (
                  <div
                    key={item.id}
                    className="col col-xl-3 col-lg-6 col-md-6 col-12"
                  >
                    <div
                      className="office-info-item row"
                      style={{
                        backgroundColor: "white",
                        maxHeight: "150px",
                        overflow: "hidden",
                      }}
                    >
                      <div className="col-6 d-flex align-items-center justify-content-center">
                        <div className="icon">
                          <img
                            src={item && item.iconImageUrl}
                            style={{
                              objectFit: "cover",
                              width: "7rem",
                              height: "7rem",
                            }}
                            alt="Icon"
                          />
                        </div>
                      </div>
                      <div
                        className="col-6 d-flex align-items-center justify-content-center"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          WebkitLineClamp: 2,
                        }}
                      >
                        <h2 style={{ fontSize: "19px" }}>
                          {language === "english"
                            ? (item && item.englishName) ?? (item && item.name)
                            : item && item.name
                          }
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <div className="row">
        <div className="col col-lg-3 col-12">
          <div className="shadow p-4" style={{ backgroundColor: "white" }}>
            <ThemeProvider theme={theme}>
              <h4 className="mt-2">{t("Filter")}</h4>
              <FormControlLabel control={<Checkbox />} label="Filter" />
              <FormControlLabel control={<Checkbox />} label="Filter" />
              <FormControlLabel control={<Checkbox />} label="Filter" />
              <h6>{t("Price")}</h6>
              <Slider
                getAriaLabel={() => "Price range"}
                valueLabelDisplay="auto"
              />
            </ThemeProvider>
          </div>
        </div>
        <div className="col col-lg-9 col-12">
          <Search placeholder={t("Search")}></Search>
          <div>
            {items.map((item) => (
              <div
                key={item.id}
                className="grid"
                style={{ backgroundColor: "white" }}
              >
                <Image
                  src={item.imageUrl ?? ""}
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
                    <Link href={`/interior/${item.id}`}>
                      {language === "english"
                        ? (item && item.englishName) ?? (item && item.name)
                        : item && item.name
                      }
                    </Link>
                  </h3>
                  <div className="price">
                    <span>
                      {item &&
                        item.estimatePrice &&
                        item.estimatePrice.toLocaleString("en-US") + " VND"}
                    </span>
                  </div>
                  <div className="add-to-cart">
                    <button
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      title="Add to Cart"
                      onClick={() => handleCreateBookmark(item.id)}
                    >
                      {t("Save")}
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
