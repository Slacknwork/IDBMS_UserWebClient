import ClientLayout from "./ClientLayout";

export const metadata = {
  title: {
    default: "IDT - Interior Item Bookmark",
  },
};

export default function BookmarkLayout(props) {
  return <ClientLayout>{props.children}</ClientLayout>;
}
