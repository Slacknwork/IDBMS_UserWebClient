"use client";

import { useEffect, useState } from "react";
import { useRouter } from "/navigation";
import { useSearchParams } from "next/navigation";

export default function Pagination({ query = "page", count = 0 }) {
  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION
  const [page, setPage] = useState(Math.max(searchParams.get(query) - 1, 0));

  const changeSearchParams = (newPage) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set(query, newPage + 1);
    url.search = searchParams.toString();
    router.push(url.toString(), undefined, { scroll: false });
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
    changeSearchParams(newPage);
  };

  useEffect(() => {
    setPage(Math.max(searchParams.get(query) - 1, 0));
  }, [searchParams]);

  return (
    <div className="pagination-wrapper pagination-wrapper-center">
      <ul className="pg-pagination">
        {page > 0 && (
          <li>
            <a onClick={() => handleChangePage(page - 1)} aria-label="Previous">
              <i className="ti-angle-left"></i>
            </a>
          </li>
        )}
        {Array.from(Array(count), (e, i) => {
          return (
            <li className={`${page == i ? "active" : ""}`} key={i}>
              <a onClick={() => handleChangePage(i)}>{i + 1}</a>
            </li>
          );
        })}
        {page < count - 1 && (
          <li>
            <a onClick={() => handleChangePage(page + 1)} aria-label="Next">
              <i className="ti-angle-right"></i>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
