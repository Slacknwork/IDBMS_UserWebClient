import React from "react";
import Link from "next/link";

import url from "/constants/url";

const Scrollbar = () => {
  return (
    <div className="col-lg-12">
      <div className="header-menu">
        <ul className="smothscroll">
          <li>
            <Link href={url.id.NAVBAR}>
              <i className="ti-arrow-up"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Scrollbar;
