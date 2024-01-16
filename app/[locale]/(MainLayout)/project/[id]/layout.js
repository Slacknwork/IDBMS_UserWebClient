import ClientLayout from "./ClientLayout";

export const metadata = {
  title: {
    default: "IDT - Project Details",
  },
};

export default function ProjectLayout(props) {
  return <ClientLayout>{props.children}</ClientLayout>;
}
