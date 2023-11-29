"use client";

import urls from "/constants/urls";
import { Link } from "/navigation";

export default function OverviewBreadcrumb({ id, name }) {
  const breadcrumbHrefs = {
    ...(id && { overviewHref: urls.project.id.documents.getUri(id) }),
  };

  return (
    <div className="wpo-breadcumb-wrap">
      <ol>
        {id && (
          <li>
            <Link href={breadcrumbHrefs.overviewHref}>
              {name || `Documents`}
            </Link>
          </li>
        )}
      </ol>
    </div>
  );
}
