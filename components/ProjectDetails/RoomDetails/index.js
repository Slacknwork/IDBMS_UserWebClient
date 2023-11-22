"use client";

import urls from "/constants/urls";
import { Link } from "/navigation";

export default function RoomDetails() {
  const breadcrumbHrefs = {
    overviewHref: urls.project.id.getUri(1),
    siteHref: urls.project.id.site.siteNo.getUri(1, 1),
    floorHref: urls.project.id.site.siteNo.floor.floorNo.getUri(1, 1, 1),
    roomHref: urls.project.id.site.siteNo.floor.floorNo.room.roomNo.getUri(
      1,
      1,
      1,
      1
    ),
  };

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="wpo-breadcumb-wrap">
              <ol>
                <li>
                  <Link href={breadcrumbHrefs.overviewHref}>Overview</Link>
                </li>
                <li>
                  <Link href={breadcrumbHrefs.siteHref}>Site 1</Link>
                </li>
                <li>
                  <Link href={breadcrumbHrefs.floorHref}>Floor 1</Link>
                </li>
                <li>
                  <Link href={breadcrumbHrefs.roomHref}>Room 1</Link>
                </li>
              </ol>
            </div>
          </div>
          <div className="col col-lg-3 col-12">
            <h3>Room Information</h3>
          </div>
          <div className="col col-lg-3 col-12">
            <div className="form-field">
              <label className="mb-1">Room Name</label>
              <input type="text" name="name" placeholder="Your Name" />
            </div>
          </div>
          <div className="col col-lg-3 col-12">
            <div className="form-field">
              <label className="mb-1">Use purpose</label>
              <input type="text" name="name" placeholder="Use purpose" />
            </div>
          </div>
          <div className="col col-lg-3 col-12">
            <div className="form-field">
              <label className="mb-1">Room Type</label>
              <select type="text" name="subject">
                <option>Service</option>
                <option>Architecture</option>
                <option>The Rehearsal Dinner</option>
                <option>The Afterparty</option>
                <option>Videographers</option>
                <option>Perfect Cake</option>
                <option>All Of The Above</option>
              </select>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Room Description</label>
              <textarea
                type="text"
                name="message"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Price</label>
              <input type="text" name="name" placeholder="Your Name" />
            </div>
            <div className="form-field">
              <label className="mb-1">Tasks</label>
              <input type="text" name="name" placeholder="Your Name" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
