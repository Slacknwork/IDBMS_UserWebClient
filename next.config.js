const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl({
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});
