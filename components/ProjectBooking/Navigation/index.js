import Link from "next/link";

export default function Navigation({ backUrl, backLabel, nextUrl, nextLabel }) {
  const DEFAULT_BACK_LABEL = "Previous";
  const DEFAULT_NEXT_LABEL = "Next";

  return (
    <div
      className={`container d-flex ${nextUrl ? "justify-content-between" : ""}`}
    >
      {backUrl ? (
        <div className="m-4 mr-auto">
          <Link className="theme-btn-s2 rounded-2 px-4" href={backUrl}>
            {backLabel || DEFAULT_BACK_LABEL}
          </Link>
        </div>
      ) : (
        <div />
      )}
      {nextUrl ? (
        <div className="ml-auto m-4">
          <Link className="theme-btn-s4 px-4" href={nextUrl}>
            {nextLabel || DEFAULT_NEXT_LABEL}
          </Link>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
