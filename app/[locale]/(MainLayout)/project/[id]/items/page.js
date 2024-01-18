"use client";

import { useEffect, useState } from "react";
import { Link } from "/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { getItemInTasksByProjectId } from "/services/itemInTaskServices";
import { getAllInteriorItemCategories } from "/services/interiorItemCategoryServices";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";
import projectTaskStatusOptions, {
  projectTaskStatusOptionsEnglish,
} from "/constants/enums/projectTaskStatus";

import NavButton from "/components/Shared/NavButton";

export default function ItemsPage() {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";
  const categoryQuery = "itemCategory";

  const statusQuery = "taskStatus";

  const defaultPage = 1;
  const defaultPageSize = 5;
  const pageSizeQuery = "size";

  // INIT
  const o = useTranslations("ProjectDetails_Overview");
  const t = useTranslations("ProjectDetails_Item");
  const e = useTranslations("Error");

  const params = useParams();
  const searchParams = useSearchParams();
  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
      ? "vietnamese"
      : "";

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    setLoading(true);
    const fetchItems = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) || "";
      const categoryId = searchParams.get(categoryQuery) || "";
      const status = searchParams.get(statusQuery)
        ? parseInt(searchParams.get(statusQuery))
        : "";
      const page = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getItemInTasksByProjectId({
          projectId,
          search,
          categoryId,
          status,
          page,
          pageSize,
        });
        console.log(response);
        setItems(response?.list ?? []);
        setCount(response?.totalPage ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(e("FetchError"));
      }
    };
    await Promise.all([fetchItems()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  // ITEM CATEGORIES
  const [itemCategories, setItemCategories] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    const fetchCategories = async () => {
      try {
        const response = await getAllInteriorItemCategories();
        console.log(response);
        setItemCategories(response.list);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(e("FetchError"));
      }
    };
    await Promise.all([fetchCategories()]);
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  return (
    <div className="container" style={{ minHeight: "40rem" }}>
      <div className="row">
        <div className="col col-lg-12 col-12">
          <NavButton
            url={`/project/${params.id}`}
            label={o("Overview")}
          ></NavButton>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <div className="d-flex justify-content-between">
            <h3 className="my-auto">{t("Items")}</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6 col-12 mb-4">
          <Search placeholder={t("SearchItems")}></Search>
        </div>
        <div className="col col-lg-6 col-12 wpo-contact-pg-section">
          <form>
            <div className="wpo-contact-form-area-transparent m-0 row">
              <div className="col col-lg-6 col-12">
                <div className="form-field shadow-sm">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2 "
                    style={{ backgroundColor: "white", height: "55px" }}
                  >
                    {itemCategories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {language === "english"
                          ? category.englishName
                          : category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col col-lg-6 col-12">
                <div className="form-field shadow-sm">
                  <select
                    type="text"
                    name="subject"
                    className="rounded-2"
                    style={{ backgroundColor: "white", height: "55px" }}
                  >
                    {projectTaskStatusOptions.map((status, index) => (
                      <option key={status} value={index}>
                        {language === "english"
                          ? projectTaskStatusOptionsEnglish[index]
                          : status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <Stack sx={{ height: "30rem" }}>
          <CircularProgress
            sx={{ m: "auto", color: "#CAAD06" }}
            size="3rem"
          ></CircularProgress>
        </Stack>
      ) : items && items.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead
            className="shadow-sm"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th scope="col" style={{ width: "12rem" }}>
              {t("Image")}
              </th>
              <th scope="col">{t("Name")}</th>
              <th scope="col">{t("Category")}</th>
              <th scope="col">{t("Quantity")}</th>
              <th scope="col" style={{ width: "10rem" }}>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="align-middle">
                  <div className="shop-img">
                    <Image
                      src={item && item.interiorItem?.imageUrl}
                      alt=""
                      width={500}
                      height={500}
                      style={{
                        width: "6rem",
                        height: "6rem",
                        objectFit: "cover",
                      }}
                      unoptimized={true}
                    />
                  </div>
                </td>
                <td className="align-middle">
                  {(() => {
                    if (language === "english") {
                      return item?.interiorItem?.englishName;
                    } else if (language === "vietnamese") {
                      return item?.interiorItem?.name;
                    } else {
                      return "";
                    }
                  })()}
                </td>
                <td className="align-middle">
                  {(() => {
                    if (language === "english") {
                      return item?.interiorItem?.interiorItemCategory
                        ?.englishName;
                    } else if (language === "vietnamese") {
                      return item?.interiorItem?.interiorItemCategory?.name;
                    } else {
                      return "";
                    }
                  })()}
                </td>
                <td className="align-middle">{item && item.quantity}</td>
                <td className="align-middle m-0">
                  <div className="d-flex">
                    <Link
                      href={`/items/${item?.interiorItem.id}`}
                      className="theme-btn m-1"
                      style={{ width: "6rem", zIndex: 0 }}
                    >
                      {t("Details")}
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Stack sx={{ height: "100%" }}>
          <p style={{ margin: "auto", textAlign: "center" }}>{t("NoItem")}</p>
        </Stack>
      )}
      <Pagination count={count}></Pagination>
    </div>
  );
}
