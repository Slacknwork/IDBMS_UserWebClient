import React from "react";
import Link from "next/link";

import urls from "/constants/urls";

const Scrollbar = () => {
  return (
    <div className="col-lg-12">
      <div className="header-menu">
        <ul className="smothscroll">
          <li>
            <Link href={urls.id.NAVBAR}>
              <i className="ti-arrow-up"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Scrollbar;
