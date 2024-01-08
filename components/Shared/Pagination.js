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
    newPage ? searchParams.set(query, newPage + 1) : searchParams.delete(query);
    url.search = searchParams.toString();
    router.push(url.toString(), { scroll: false });
  };
  const handleChangePage = (e, newPage) => {
    e.preventDefault();
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
            <button
              className="page-btn"
              onClick={(e) => handleChangePage(e, page - 1)}
              aria-label="Previous"
            >
              <i className="ti-angle-left"></i>
            </button>
          </li>
        )}
        {Array.from(Array(count), (e, i) => {
          return (
            <li key={i}>
              <button
                className={`page-btn ${page == i ? "active" : ""}`}
                onClick={(e) => handleChangePage(e, i)}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
        {page < count - 1 && (
          <li>
            <button
              className="page-btn"
              onClick={(e) => handleChangePage(e, page + 1)}
              aria-label="Next"
            >
              <i className="ti-angle-right"></i>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
