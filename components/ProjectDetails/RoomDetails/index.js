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
      <div className="col col-lg-6 col-12">
        <div className="form-field">
          <label className="mb-1">Room Description</label>
          <textarea type="text" name="message" placeholder="Message"></textarea>
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
  );
};

export default function RoomDetails() {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <FloorDetailsForm></FloorDetailsForm>
      </form>
    </div>
  );
}
