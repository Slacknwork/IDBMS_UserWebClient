import ClientLayout from "./ClientLayout";

export const metadata = {
  title: {
    default: "IDT - 1",
  },
};

export default function ProjectLayout(props) {
  return <ClientLayout>{props.children}</ClientLayout>;
}
