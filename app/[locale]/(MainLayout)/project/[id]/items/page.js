"use client";

import { useEffect, useState } from "react";
import { Link } from "/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress, Stack } from "@mui/material";
import Image from "next/image";

import { getItemInTasksByProjectId } from "/services/itemInTaskServices";

import Search from "/components/Shared/Search";
import Pagination from "/components/Shared/Pagination";

export default function ItemsPage() {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";
  const categoryQuery = "category";
  const defaultPage = 1;
  const defaultPageSize = 5;

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  const fetchItems = async () => {
    try {
      const projectId = params.id;
      const categoryId = searchParams.get(categoryQuery) ?? "";
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = defaultPageSize;

      const items = await getItemInTasksByProjectId({
        projectId,
        categoryId,
        search,
        page,
        pageSize,
      });
      setItems(items.list);
      setCount(items.totalPage);
    } catch (error) {
      toast.error("Error: Items in Task!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchItems()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        minHeight: "35rem",
      }}
    >
      <h3>Items</h3>
      <div className="row">
        <div className="col col-lg-6 col-12 my-4">
          <Search placeholder="Search Items..."></Search>
        </div>
      </div>

      {loading ? (
        <Stack sx={{ height: "30rem" }}>
          <CircularProgress
            sx={{ m: "auto", color: "#CAAD06" }}
            size="3rem"
          ></CircularProgress>
        </Stack>
      ) : (
        <table className="table table-striped table-hover">
          <thead
            className="shadow-sm"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th scope="col" style={{ width: "7rem" }}>
                Image
              </th>
              <th scope="col">Item name</th>
              <th scope="col">Location</th>
              <th scope="col">Created Date</th>
              <th scope="col">Task status</th>
              <th scope="col" style={{ width: "15rem" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => (
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
                    {item && item.interiorItem?.name}
                  </td>
                  <td
                    className="align-middle"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {item &&
                      item.room &&
                      `-${item.room.usePurpose} \n -Tầng ${item.room.floor.floorNo} \n -${item.room.floor.site.name}`}
                  </td>
                  <td className="align-middle">
                    {item &&
                      new Date(item.createdDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="align-middle">{item && item.status}</td>
                  <td className="align-middle m-0">
                    <div className="d-flex">
                      <Link
                        href={`/items/${item?.interiorItem.id}`}
                        className="theme-btn m-1"
                        style={{ width: "6rem", zIndex: 0 }}
                      >
                        Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
