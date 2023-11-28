import ClientLayout from "./ClientLayout";

export const metadata = {
  title: {
    default: "IDT - Interior Decor and Construction",
  },
};

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
