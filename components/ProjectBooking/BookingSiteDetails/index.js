import React from "react";
import Link from "next/link";

const SiteDetailsForm = () => {
  return (
    <div className="row">
      <div className="col col-lg-4 col-12 my-auto">
        <h3>Site Information</h3>
        <p>A site is required to have at least 1 floor</p>
      </div>
      <div className="col col-lg-4 col-12">
        <div className="form-field">
          <label className="mb-1">Site Name</label>
          <input type="text" name="name" placeholder="Your Name" />
        </div>
      </div>
      <div className="col col-lg-4 col-12">
        <div className="form-field">
          <label className="mb-1">Use purpose</label>
          <input type="text" name="name" placeholder="Use purpose" />
        </div>
      </div>
      <div className="col col-lg-6 col-12">
        <div className="form-field">
          <label className="mb-1">Site Description</label>
          <textarea type="text" name="message" placeholder="Message"></textarea>
        </div>
      </div>
      <div className="col col-lg-6 col-12">
        <div className="form-field">
          <label className="mb-1">Site Note</label>
          <textarea type="text" name="message" placeholder="Message"></textarea>
        </div>
      </div>
    </div>
  );
};
const RoomItem = () => {
  return (
    <div className="container">
      <div className="row shadow p-4 my-4 mx-1" style={{ height: "18rem" }}>
        <div className="col-4 col-lg-3 my-auto">
          <div className="shop-img">
            <div style={{ width: "14rem", height: "14rem" }} />
          </div>
        </div>
        <div className="col-8 col-lg-9 d-flex align-items-start justify-content-between">
          <div className="shop-info my-auto">
            <h3 className="">Site name</h3>
            <div className="des">
              <p>Address: 420 Something Street</p>
              <p>Total area: 1000m2</p>
              <p>Total price: 10,000,000 VND</p>
            </div>
          </div>
          <div className="mt-auto d-flex gap-3">
            <div>
              <Link href="/project/booking" className="theme-btn px-4" replace>
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingSiteDetails = () => {
  return (
    <div className="wpo-contact-form-area pb-0">
      <form className="contact-validation-active">
        <SiteDetailsForm></SiteDetailsForm>
        <div className="row">
          <div className="col col-lg-12 col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Rooms</h3>
              <div className="d-flex">
                <button className="theme-btn-s4 px-4 py-2">Add</button>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "30rem",
              overflowY: "scroll",
            }}
          >
            <RoomItem />
            <RoomItem />
            <RoomItem />
            <RoomItem />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingSiteDetails;
