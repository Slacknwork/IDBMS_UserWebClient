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
