import React from "react";

const InteriorItemCategories = ({ categories }) => {
  return (
    <section className="wpo-contact-pg-section section-padding">
      <div className="container ">
        <div className="office-info">
          <div className="row gx-5 gy-4">
            {categories.length > 0 &&
              categories.slice(0, 12).map((category) => (
                <div
                  className="col col-xl-3 col-lg-6 col-md-6 col-12"
                  key={category}
                >
                  <div className="office-info-item row">
                    <div className="col-3">
                      <div className="icon">
                        <i className="fi flaticon-location"></i>
                      </div>
                    </div>
                    <div className="col-9">
                      <h2>{category.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorItemCategories;
