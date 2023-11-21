import { Link } from "/navigation";

import urls from "/constants/urls";

export default function TaskDetails() {
  const reportsHref = urls.project.id.tasks.taskId.reports.getUri(1, 1);

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-3 col-12">
            <h3>Task Information</h3>
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
              <div className="d-flex">
                <label className="my-auto">Reports</label>
                <div className="d-flex">
                  <Link
                    href={reportsHref}
                    className="theme-btn px-4 mx-4"
                    replace
                  >
                    View Reports
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
