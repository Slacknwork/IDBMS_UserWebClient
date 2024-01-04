"use client";

import urls from "/constants/urls";
import { Link } from "/navigation";

export default function OverviewBreadcrumb({
  id,
  name,
  floorId,
  floorName,
  roomId,
  roomName,
}) {
  const breadcrumbHrefs = {
    ...(id && { overviewHref: urls.project.id.getUri(id) }),
    ...(floorId && {
      floorHref: urls.project.id.site.siteNo.floor.floorNo.getUri(
        id,
        siteId,
        floorId
      ),
    }),
    ...(roomId && {
      roomHref: urls.project.id.site.siteNo.floor.floorNo.room.roomNo.getUri(
        1,
        1,
        1,
        1
      ),
    }),
  };

  return (
    <div className="wpo-breadcumb-wrap">
      <ol>
        {id && (
          <li>
            <Link href={breadcrumbHrefs.overviewHref}>{name || `Project`}</Link>
          </li>
        )}
        {floorId && (
          <li>
            <Link href={breadcrumbHrefs.floorHref}>{floorName || `Floor`}</Link>
          </li>
        )}
        {roomId && (
          <li>
            <Link href={breadcrumbHrefs.roomHref}>{roomName || `Room`}</Link>
          </li>
        )}
      </ol>
    </div>
  );
}
