import React from "react";

const BasicInfoForm = () => {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-12">
            <h3 className="mb-3">Basic Information</h3>
          </div>
          <div className="col col-lg-4 col-12">
            <div className="form-field">
              <label className="mb-1">Project Name</label>
              <input type="text" name="name" placeholder="Your Name" />
            </div>
          </div>
          <div className="col col-lg-4 col-12">
            <div className="form-field">
              <label className="mb-1">Project Category</label>
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
          <div className="col col-lg-4 col-12">
            <div className="form-field">
              <label className="mb-1">Use purpose</label>
              <input type="text" name="name" placeholder="Your Name" />
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Project Description</label>
              <textarea
                type="text"
                name="message"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <label className="mb-1">Project Note</label>
              <textarea
                type="text"
                name="message"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;
