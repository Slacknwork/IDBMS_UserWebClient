"use client";

import urls from "/constants/urls";
import { Link } from "/navigation";

export default function OverviewBreadcrumb({ id, name, taskId, taskName }) {
  const breadcrumbHrefs = {
    ...(id && { overviewHref: urls.project.id.tasks.getUri(id) }),
    ...(taskId && {
      taskHref: urls.project.id.tasks.taskId.getUri(id, taskId),
    }),
  };

  return (
    <div className="wpo-breadcumb-wrap">
      <ol>
        {id && (
          <li>
            <Link href={breadcrumbHrefs.overviewHref}>{name || `Tasks`}</Link>
          </li>
        )}
        {taskId && (
          <li>
            <Link href={breadcrumbHrefs.taskHref}>
              {taskName || `Task Details`}
            </Link>
          </li>
        )}
      </ol>
    </div>
  );
}
