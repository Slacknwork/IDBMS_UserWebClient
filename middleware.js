import createMiddleware from "next-intl/middleware";
import localeConstants from "/constants/locales";
import { locales } from "./navigation";

export default createMiddleware({
  defaultLocale: localeConstants.vi_VN,
  locales,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(vi-VN|en-US)/:path*"],
};
