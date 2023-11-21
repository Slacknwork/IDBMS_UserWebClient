import { createSharedPathnamesNavigation } from "next-intl/navigation";
import localeConstants from "./constants/locales";

export const locales = [localeConstants.vi_VN, localeConstants.en_US];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
