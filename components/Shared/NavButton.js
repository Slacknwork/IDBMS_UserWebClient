import { useState } from "react";
import { Link } from "/navigation";
import { IoChevronBackSharp } from "react-icons/io5";

export default function NavButton({ url, label }) {
  const [isHoverBack, setIsHoverBack] = useState(false);

  return (
    <div className="d-flex">
      <Link href={url}>
        <button
          className="d-flex border-0 bg-white p-0 mb-2"
          style={{ transition: "all 0.3s" }}
          onMouseEnter={() => setIsHoverBack(true)}
          onMouseLeave={() => setIsHoverBack(false)}
        >
          <IoChevronBackSharp
            size={25}
            color={`${!isHoverBack ? "grey" : "#CAAD06"}`}
            className="my-auto"
            style={{ marginRight: "5px", transition: "all 0.2s" }}
          />
          <p
            className="my-auto"
            style={{
              color: !isHoverBack ? "grey" : "#CAAD06",
              transition: "all 0.2s",
            }}
          >
            {label || "Back"}
          </p>
        </button>
      </Link>
    </div>
  );
}
