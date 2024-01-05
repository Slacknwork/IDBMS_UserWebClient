import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "/navigation";

export default function Search({ query = "search", placeholder }) {
  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();

  // SEARCH FORM
  const [search, setSearch] = useState(searchParams.get(query) || "");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    search ? searchParams.set(query, search) : searchParams.delete(query);
    url.search = searchParams.toString();
    router.push(url.toString(), { scroll: false });
  };

  return (
    <div className="blog-sidebar">
      <div className="widget search-widget">
        <form onSubmit={onSearchSubmit}>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder || ""}
              value={search}
              onChange={onSearchChange}
            />
            <button type="submit">
              <i className="ti-search"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
