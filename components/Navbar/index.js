import React from "react";
import Header from "../Header";

export default function Navbar(props) {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => setScroll(document.documentElement.scrollTop);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const className = scroll > 80 ? "fixed-navbar" : "fixed-navbar";

  return (
    <div id="#navbar" className="fixed-navbar">
      <Header hclass={props.hclass} />
    </div>
  );
}
