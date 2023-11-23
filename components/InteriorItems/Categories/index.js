"use client";

function Category() {
  return (
    <div className="col col-xl-3 col-lg-6 col-md-6 col-12">
      <div
        className="office-info-item row"
        style={{ backgroundColor: "white" }}
      >
        <div className="col-3">
          <div className="icon">
            <i className="fi flaticon-location"></i>
          </div>
        </div>
        <div className="col-9">
          <h2>Appliances</h2>
        </div>
      </div>
    </div>
  );
}

export default function InteriorItemCategories() {
  return (
    <section className="wpo-contact-pg-section">
      <div className="container ">
        <div className="office-info p-0" style={{ marginBottom: "3rem" }}>
          <div className="row gx-5 gy-4">
            <Category></Category>
            <Category></Category>
            <Category></Category>
            <Category></Category>
          </div>
        </div>
      </div>
    </section>
  );
}
