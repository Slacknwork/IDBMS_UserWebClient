import { useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { Link, useRouter, usePathname } from "/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { logout } from "/store/reducers/customer";
import { Avatar, Chip } from "@mui/material";

import locales from "/constants/locales";
import languageOptions, {
  languageTypeChipImages,
  languageTypeChipColors,
  languageLocaleIndex,
} from "/constants/enums/language";

import MobileMenu from "/components/MobileMenu/MobileMenu";
import { getColorForAvatar, getAvatarContent } from "/utils/avatar";

const Logo = "/images/idt-logo.jpg";

const Header = (props) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [menuActive, setMenuActive] = useState(false);
  const t = useTranslations("Header");
  const user = useSelector((state) => state.customer);

  const openMenu = (state) => {
    setMenuActive(state);
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
              <div className="col-lg-8 col-md-1 col-1">
                <div
                  id="navbar"
                  className="collapse navbar-collapse navigation-holder"
                >
                  <button className="menu-close">
                    <i className="ti-close"></i>
                  </button>
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    <li className="menu-item-has-children">
                      <Link href="/">{t("Home")}</Link>
                    </li>
                    <li>
                      <Link href="/about">{t("About")}</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link href="/project">{t("Projects")}</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link href="/interior">{t("Interior")}</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-1 col-2 d-flex justify-content-end">
                <Chip
                  component={Link}
                  href={pathname}
                  locale={
                    params.locale === locales.vi_VN
                      ? locales.en_US
                      : locales.vi_VN
                  }
                  avatar={
                    <Avatar
                      sx={{ width: 18, height: 18 }}
                      src={
                        languageTypeChipImages[
                          languageLocaleIndex[params.locale]
                        ]
                      }
                    />
                  }
                  variant="outlined"
                  label={languageOptions[languageLocaleIndex[params.locale]]}
                  color={
                    languageTypeChipColors[languageLocaleIndex[params.locale]]
                  }
                  sx={{
                    mr: 2,
                    my: "auto",
                    "& .MuiChip-label": {
                      paddingTop: "1px",
                    },
                  }}
                ></Chip>
                <div className="header-right">
                  <div className="header-right-menu-wrapper">
                    <div className="header-right-menu">
                      {!user.loggedIn ? (
                        <Link href="/login" style={{ color: "black" }}>
                          {t("Login")}
                        </Link>
                      ) : (
                        <Avatar
                          sx={{
                            cursor: "pointer",
                            bgcolor: getColorForAvatar(user?.username),
                            width: 50,
                            height: 50,
                          }}
                          onClick={() => openMenu(!menuActive)}
                          alt={user?.username}
                        >
                          <h5 className="my-auto" style={{ color: "white" }}>
                            {getAvatarContent(user?.username)}
                          </h5>
                        </Avatar>
                      )}

                      <div
                        className={`header-right-menu-wrap d-flex flex-column justify-content-between ${
                          menuActive ? "right-menu-active" : ""
                        }`}
                      >
                        <div className="">
                          <button
                            onClick={() => openMenu(!menuActive)}
                            className="right-menu-close"
                          >
                            <i className="ti-close"></i>
                          </button>
                          <div className="d-flex mb-5">
                            <Avatar
                              sx={{
                                mr: 2,
                                cursor: "pointer",
                                bgcolor: getColorForAvatar(user?.username),
                                width: 50,
                                height: 50,
                              }}
                              onClick={() => openMenu(!menuActive)}
                              alt={user?.username}
                            >
                              <h5
                                className="my-auto"
                                style={{ color: "white" }}
                              >
                                {getAvatarContent(user?.username)}
                              </h5>
                            </Avatar>
                            <h3 className="text-white my-auto">
                              {user.username}
                            </h3>
                          </div>

                          <h5 className="mb-4">
                            <Link
                              href="/bookmark"
                              style={{
                                color: "white",
                                textDecoration: "none",
                                transition: "color 0.3s",
                                ":hover": {
                                  color: "#CAAD06",
                                },
                              }}
                            >
                              Projects
                            </Link>
                          </h5>

                          <h5 className="mb-4">
                            <Link
                              href="/bookmark"
                              style={{
                                color: "white",
                                textDecoration: "none",
                                transition: "color 0.3s",
                                ":hover": {
                                  color: "#CAAD06",
                                },
                              }}
                            >
                              Bookmarks
                            </Link>
                          </h5>
                        </div>

                        <Link
                          className="theme-btn"
                          onClick={() => dispatch(logout())}
                          href="/login"
                        >
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
