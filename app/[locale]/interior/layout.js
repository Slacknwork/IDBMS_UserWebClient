import ClientLayout from "./ClientLayout";

export const metadata = {
  title: {
    default: "IDT - Interior Items",
  },
};

export default function ProjectLayout(props) {
  return <ClientLayout>{props.children}</ClientLayout>;
}
