"use client";

import { Link } from "/navigation";
import { useSearchParams } from "next/navigation";

export default function Pagination({
  pageCount = 5,
  pageQuery = "page",
  sectionId = "",
}) {
  const searchParams = useSearchParams();

  const currentPage = searchParams.get(pageQuery)
    ? searchParams.get(pageQuery) - 1
    : 0;

  function getHref(page) {
    return {
      query: { [pageQuery]: page + 1 },
    };
  }

  return (
    <div className="pagination-wrapper pagination-wrapper-center">
      <ul className="pg-pagination">
        {currentPage > 0 && (
          <li>
            <Link
              href={getHref(currentPage - 1)}
              aria-label="Previous"
              scroll={false}
            >
              <i className="ti-angle-left"></i>
            </Link>
          </li>
        )}
        {Array.from(Array(pageCount), (e, i) => {
          return (
            <li className={`${currentPage == i ? "active" : ""}`} key={i}>
              <Link href={getHref(i)} scroll={false}>
                {i + 1}
              </Link>
            </li>
          );
        })}
        {currentPage < pageCount - 1 && (
          <li>
            <Link
              href={getHref(currentPage + 1)}
              aria-label="Next"
              scroll={false}
            >
              <i className="ti-angle-right"></i>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
