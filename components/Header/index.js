import { useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { Link, useRouter } from "/navigation";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "/store/reducers/user";

import MobileMenu from "/components/MobileMenu/MobileMenu";

const Logo = "/images/idt-logo.jpg";

const Header = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [menuActive, setMenuActive] = useState(false);

  const user = useSelector((state) => state.user);

  const openMenu = (state) => {
    user.loggedIn ? setMenuActive(state) : router.push("/login");
  };

  return (
    <header id="header">
      <div className={`wpo-site-header ${props.hclass}`}>
        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
                  <MobileMenu />
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-6">
                <div className="navbar-header">
                  <Link
                    className="navbar-brand d-flex justify-content-between"
                    href="/"
                    style={{ width: 50, height: 50 }}
                  >
                    <Image
                      src={Logo}
                      alt=""
                      className="p-2"
                      layout="fill"
                      objectFit="contain"
                    />
                    <h2
                      style={{
                        marginLeft: "8.5rem",
                        marginTop: "0.25rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      IDT Décor
                    </h2>
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-1 col-1">
                <div
                  id="navbar"
                  className="collapse navbar-collapse navigation-holder"
                >
                  <button className="menu-close">
                    <i className="ti-close"></i>
                  </button>
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    <li className="menu-item-has-children">
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link href="/project">Projects</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link href="/interior">Interior</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 col-2">
                <div className="header-right">
                  <div className="header-right-menu-wrapper">
                    <div className="header-right-menu">
                      <HiUserCircle
                        size={40}
                        title="User"
                        style={{ cursor: "pointer" }}
                        onClick={() => openMenu(!menuActive)}
                      ></HiUserCircle>
                      <div
                        className={`header-right-menu-wrap ${
                          menuActive ? "right-menu-active" : ""
                        }`}
                      >
                        <button
                          onClick={() => openMenu(!menuActive)}
                          className="right-menu-close"
                        >
                          <i className="ti-close"></i>
                        </button>
                        <h4 className="text-white mb-4">
                          Welcome, {user.username}
                        </h4>
                        <Link onClick={() => dispatch(logout())} href="/login">
                          Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
