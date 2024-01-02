"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "/navigation";
import { FaTrash } from "react-icons/fa";

import urls from "/constants/urls";
import { toast } from "react-toastify";
import { getProjectTasksByProjectId } from "/services/projectTaskServices";
import Image from "next/image";

const ItemTableItem = (object) => {
  const ItemHref =
    urls.project.booking.decor.site.siteNo.floor.floorNo.room.roomNo.getUri(
      1,
      1,
      1
    );

  const item = object.item;
  const no = object.index;

  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "right" }}>
        {no}
      </th>
      <td className="align-middle">
        <div className="shop-img">
          <Image
            src={item && item.interiorItem?.imageUrl}
            alt=""
            width={0}
            height={0}
            style={{ width: "6rem", height: "6rem", objectFit: "cover" }}
            unoptimized={true}
          />
        </div>
      </td>
      <td className="align-middle">{item && item.interiorItem?.name}</td>
      <td className="align-middle" style={{ whiteSpace: "pre-line" }}>
        {item &&
          item.room &&
          `-${item.room.usePurpose} \n -Tầng ${item.room.floor.floorNo} \n -${item.room.floor.site.name}`}
      </td>
      <td className="align-middle">
        {item && new Date(item.createdDate).toLocaleDateString("en-GB")}
      </td>
      <td className="align-middle">{item && item.status}</td>
      <td className="align-middle m-0">
        <div className="d-flex">
          <Link
            href={ItemHref}
            className="theme-btn m-1"
            style={{ width: "6rem", zIndex: 0 }}
          >
            Details
          </Link>
          <button
            type="button"
            className="theme-btn m-1"
            style={{ width: "3.5rem", backgroundColor: "crimson", zIndex: 0 }}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

const ItemTable = (itemList) => {
  console.log(itemList);
  const values = itemList.itemList;
  return (
    <div
      style={{
        height: "25rem",
        overflowY: "scroll",
      }}
    >
      <table className="table table-striped table-hover">
        <thead
          className="shadow-sm"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          <tr>
            <th scope="col" style={{ width: "5rem" }}>
              No.
            </th>
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
          {values &&
            values.map((item, index) => (
              <ItemTableItem key={index} item={item} index={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default function ItemList() {
  const [values, setValues] = useState([]);
  const [projectId, setProjectId] = useState(
    "ff090f51-e6e7-4854-8f3f-0402ee32c9f8"
  );
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectTasksByProjectId(projectId);
          console.log(data);
          const listTaskHasItem = data.filter(
            (item) => item.interiorItemId !== null
          );
          console.log(listTaskHasItem);
          setValues(listTaskHasItem);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  }, [projectId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <ItemTable itemList={values} />
        </div>
      </div>
    </div>
  );
}
