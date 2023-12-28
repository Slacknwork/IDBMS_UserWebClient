import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import consImg from "/public/images/project-type/construction-icon-1.png";
import decorImg from "/public/images/project-type/decor-icon-1.png";

const ContactForm = () => {
  const [forms, setForms] = useState({
    name: "",
    email: "",
    projectType: 0,
    phone: "",
    address: "",
    message: "",
  });
  const [validator] = useState(
    new SimpleReactValidator({
      className: "errorMessage",
    })
  );
  const changeHandler = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
    if (validator.allValid()) {
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      validator.hideMessages();
      setForms({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      });
    } else {
      validator.showMessages();
    }
  };

  return (
    <section className="wpo-contact-pg-section">
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 offset-lg-1">
            <div className="wpo-contact-title">
              <h2>Contact us!</h2>
            </div>
            <div className="office-info">
              <div className="row">
                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="office-info-item">
                    <div className="office-info-icon">
                      <div className="icon">
                        <i className="fi flaticon-location"></i>
                      </div>
                    </div>
                    <div className="office-info-text">
                      <h2>Address</h2>
                      <p>
                        721 Phan Van Tri Street, Ward 07, Go Vap District, HCMC
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="office-info-item">
                    <div className="office-info-icon">
                      <div className="icon">
                        <i className="fi flaticon-email"></i>
                      </div>
                    </div>
                    <div className="office-info-text">
                      <h2>Email Us</h2>
                      <p>idtco@gmail.com</p>
                      <p>tuanidtco@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="office-info-item">
                    <div className="office-info-icon">
                      <div className="icon">
                        <i className="fi flaticon-telephone"></i>
                      </div>
                    </div>
                    <div className="office-info-text">
                      <h2>Call Now</h2>
                      <p>+84 983 802 117</p>
                      <p>+84 949 802 117</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="wpo-contact-title">
              <h2>Have Any Question?</h2>
              <p>
                It is a long established fact that a reader will be distracted
                content of a page when looking.
              </p>
            </div>
            <div className="wpo-contact-form-area">
              <form
                onSubmit={(e) => submitHandler(e)}
                className="contact-validation-active"
              >
                <div className="row">
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <input
                        value={forms.name}
                        type="text"
                        name="name"
                        onBlur={(e) => changeHandler(e)}
                        onChange={(e) => changeHandler(e)}
                        placeholder="Your Name"
                      />
                      {validator.message(
                        "name",
                        forms.name,
                        "required|alpha_space"
                      )}
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <input
                        value={forms.email}
                        type="email"
                        name="email"
                        onBlur={(e) => changeHandler(e)}
                        onChange={(e) => changeHandler(e)}
                        placeholder="Your Email"
                      />
                      {validator.message(
                        "email",
                        forms.email,
                        "required|email"
                      )}
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <input
                        value={forms.phone}
                        type="phone"
                        name="phone"
                        onBlur={(e) => changeHandler(e)}
                        onChange={(e) => changeHandler(e)}
                        placeholder="Your Phone"
                      />
                      {validator.message(
                        "phone",
                        forms.phone,
                        "required|phone"
                      )}
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <input
                        value={forms.address}
                        type="address"
                        name="address"
                        onBlur={(e) => changeHandler(e)}
                        onChange={(e) => changeHandler(e)}
                        placeholder="Your Address"
                      />
                      {validator.message(
                        "phone",
                        forms.phone,
                        "required|phone"
                      )}
                    </div>
                  </div>
                  <div className="col col-lg-12 col-12">
                    <Grid
                      container
                      columnSpacing={3}
                      sx={{ mb: 4 }}
                      justifyContent="center"
                    >
                      <Grid item xs={12} lg={6}>
                        <Box
                          sx={{
                            mx: "auto",
                            width: "60%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: 1,
                            borderColor: "gainsboro",
                            pt: 2,
                          }}
                        >
                          <Image
                            src={decorImg}
                            width={45}
                            height={45}
                            style={{ marginRight: "1rem" }}
                          ></Image>
                          <p>Decor</p>
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box
                          sx={{
                            mx: "auto",
                            width: "60%",
                            display: "flex",
                            justifyContent: "center",
                            border: 1,
                            borderColor: "gainsboro",
                            pt: 2,
                          }}
                        >
                          <Image
                            src={consImg}
                            width={45}
                            height={45}
                            style={{ marginRight: "1rem" }}
                          ></Image>
                          <p>Construction</p>
                        </Box>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="col col-lg-12 col-12">
                    <textarea
                      onBlur={(e) => changeHandler(e)}
                      onChange={(e) => changeHandler(e)}
                      value={forms.message}
                      type="text"
                      name="message"
                      placeholder="Message"
                    ></textarea>
                    {validator.message("message", forms.message, "required")}
                  </div>
                </div>
                <div className="submit-area">
                  <button type="submit" className="theme-btn">
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
