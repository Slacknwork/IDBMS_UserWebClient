import { FaTrash } from "react-icons/fa";

import SuggestionModal from "./SuggestionModal";

const FloorDetailsForm = () => {
  return (
    <div className="row">
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
      <div className="col col-lg-12 col-12">
        <div className="form-field">
          <label className="mb-1">Room Description</label>
          <textarea type="text" name="message" placeholder="Message"></textarea>
        </div>
      </div>
    </div>
  );
};

const RoomTableItem = () => {
  return (
    <tr>
      <th scope="row" className="align-middle" style={{ textAlign: "right" }}>
        1
      </th>
      <td className="align-middle">Room Name</td>
      <td className="align-middle">1000m2</td>
      <td className="align-middle">1,000,000 VND</td>
      <td className="align-middle m-0">
        <div className="d-flex">
          <button
            type="button"
            className="theme-btn m-1"
            style={{ width: "6rem", zIndex: 0 }}
          >
            Details
          </button>
          <button
            type="button"
            className="theme-btn m-1"
            style={{ width: "3.5rem", backgroundColor: "crimson", zIndex: 0 }}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

const RoomTable = () => {
  return (
    <div
      style={{
        height: "25rem",
        overflowY: "scroll",
      }}
    >
      <table className="table table-striped table-hover">
        <thead
          className="shadow-sm"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          <tr>
            <th scope="col" style={{ width: "6rem" }}>
              Room No.
            </th>
            <th scope="col">Name</th>
            <th scope="col">Area</th>
            <th scope="col">Price</th>
            <th scope="col" style={{ width: "15rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <RoomTableItem></RoomTableItem>
          <RoomTableItem></RoomTableItem>
          <RoomTableItem></RoomTableItem>
          <RoomTableItem></RoomTableItem>
        </tbody>
      </table>
    </div>
  );
};

export default function RoomDetails() {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <FloorDetailsForm></FloorDetailsForm>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <div className="d-flex justify-content-between">
              <h3 className="my-auto">Appliances</h3>
              <div className="d-flex">
                <SuggestionModal></SuggestionModal>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-12">
            <RoomTable></RoomTable>
          </div>
        </div>
      </form>
    </div>
  );
}
