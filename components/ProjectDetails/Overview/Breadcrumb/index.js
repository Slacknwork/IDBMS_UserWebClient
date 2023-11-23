"use client";

import urls from "/constants/urls";
import { Link } from "/navigation";

export default function OverviewBreadcrumb({
  id,
  name,
  siteId,
  siteName,
  floorId,
  floorName,
  roomId,
  roomName,
}) {
  const breadcrumbHrefs = {
    ...(id && { overviewHref: urls.project.id.getUri(id) }),
    ...(siteId && { siteHref: urls.project.id.site.siteNo.getUri(id, siteId) }),
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
            <Link href={breadcrumbHrefs.overviewHref}>
              {name || `Project ID ${id}`}
            </Link>
          </li>
        )}
        {siteId && (
          <li>
            <Link href={breadcrumbHrefs.siteHref}>
              {siteName || `Site ID ${siteId}`}
            </Link>
          </li>
        )}
        {floorId && (
          <li>
            <Link href={breadcrumbHrefs.floorHref}>
              {floorName || `Floor ID ${floorId}`}
            </Link>
          </li>
        )}
        {roomId && (
          <li>
            <Link href={breadcrumbHrefs.roomHref}>
              {roomName || `Room ID ${roomId}`}
            </Link>
          </li>
        )}
      </ol>
    </div>
  );
}
