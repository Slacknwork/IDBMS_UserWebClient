import Link from "next/link";

export default function Navigation({ backUrl, nextUrl }) {
  return (
    <div className="container d-flex justify-content-between">
      {backUrl ? (
        <div className="d-flex m-4">
          <Link className="theme-btn-s2 rounded-2 px-4" href={backUrl}>
            Back
          </Link>
        </div>
      ) : (
        <div />
      )}
      {nextUrl ? (
        <div className="d-flex m-4">
          <Link className="theme-btn-s4 px-4" href={nextUrl}>
            Next
          </Link>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
