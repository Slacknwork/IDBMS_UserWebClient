"use client";

import { Link } from "/navigation";
import OverviewBreadcrumb from "../Overview/Breadcrumb";
import SuggestionModal from "./SuggestionModal";

export default function RoomDetails() {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12">
            <OverviewBreadcrumb
              id={1}
              siteId={1}
              floorId={1}
              roomId={1}
            ></OverviewBreadcrumb>
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
            <div className="row">
              <div className="col col-lg-6 col-12">
                <div className="form-field">
                  <label className="mb-1">Area</label>
                  <input
                    type="text"
                    name="message"
                    placeholder="Message"
                  ></input>
                </div>
              </div>
              <div className="col col-lg-6 col-12">
                <div className="form-field">
                  <label className="mb-1">Price</label>
                  <input
                    type="text"
                    name="message"
                    placeholder="Message"
                  ></input>
                </div>
              </div>
            </div>
            <div className="form-field">
              <div className="d-flex gap-4">
                <label className="my-auto">Tasks</label>
                <div className="d-flex">
                  <Link href={`/project/1/tasks`} className="theme-btn px-4">
                    View Tasks
                  </Link>
                </div>
              </div>
              <div className="d-flex gap-15 justify-content-center align-items-center mt-2">
                <div className="d-flex">
                  <SuggestionModal>Add suggestion</SuggestionModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
