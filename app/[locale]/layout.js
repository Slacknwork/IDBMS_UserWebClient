import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/animate.css";
import "/styles/flaticon.css";
import "/styles/font-awesome.min.css";
import "/styles/themify-icons.css";
import "/styles/sass/style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { NextIntlClientProvider } from "next-intl";
import { useMessages } from "next-intl";

import ClientLayout from "./ClientLayout";

export const metadata = {
  title: {
    default: "IDT - Interior Decor and Construction",
  },
};

export default function RootLayout({ children, params: { locale } }) {
  const messages = useMessages();

  return (
    <html lang="en">
      <head>
        <title>IDT - Interior Decor and Construction</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <ClientLayout>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
