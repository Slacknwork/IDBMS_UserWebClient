import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import { localeIndex } from "/constants/locales";

import { createBookingRequest } from "/services/bookingRequestServices";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const params = useParams();
  const t = useTranslations("About");

  const [formData, setFormData] = useState({
    language: localeIndex[params.locale],
    contactName: "",
    contactNameError: { hasError: false, label: "" },
    contactEmail: "",
    contactEmailError: { hasError: false, label: "" },
    contactPhone: "",
    contactPhoneError: { hasError: false, label: "" },
    contactLocation: "",
    contactLocationError: { hasError: false, label: "" },
    note: "",
    noteError: { hasError: false, label: "" },
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await createBookingRequest(formData);
      toast.success("Gửi yêu cầu thành công!");
    } catch (error) {
      toast.error("Lỗi gửi yêu cầu!");
    }
  };

  return (
    <section
      className="wpo-contact-pg-section"
      style={{ marginBottom: "8rem" }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 offset-lg-1">
            <div className="wpo-contact-title">
              <h2>{t("Contact")}</h2>
            </div>
            <div className="office-info">
              <div className="row">
                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="office-info-item bg-white">
                    <div className="office-info-icon">
                      <div className="icon">
                        <i className="fi flaticon-location"></i>
                      </div>
                    </div>
                    <div className="office-info-text">
                      <h2>{t("Address")}</h2>
                      <p>
                      {t("ContactAddress")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="office-info-item bg-white">
                    <div className="office-info-icon">
                      <div className="icon">
                        <i className="fi flaticon-email"></i>
                      </div>
                    </div>
                    <div className="office-info-text">
                      <h2>{t("Email")}</h2>
                      <p>idtco@gmail.com</p>
                      <p>tuanidtco@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="office-info-item bg-white">
                    <div className="office-info-icon">
                      <div className="icon">
                        <i className="fi flaticon-telephone"></i>
                      </div>
                    </div>
                    <div className="office-info-text">
                      <h2>{t("Call")}</h2>
                      <p>+84 983 802 117</p>
                      <p>+84 949 802 117</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="wpo-contact-title">
              <h2>{t("Question")}</h2>
              <p>
              {t("FunFact")}
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
                        value={formData.name}
                        type="text"
                        name="contactName"
                        onBlur={(e) => handleInputChange(e)}
                        onChange={(e) => handleInputChange(e)}
                        placeholder={t("FormName")}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <input
                        value={formData.email}
                        type="email"
                        name="contactEmail"
                        onBlur={(e) => handleInputChange(e)}
                        onChange={(e) => handleInputChange(e)}
                        placeholder={t("FormEmail")}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <input
                        value={formData.phone}
                        type="phone"
                        name="contactPhone"
                        onBlur={(e) => handleInputChange(e)}
                        onChange={(e) => handleInputChange(e)}
                        placeholder={t("FormPhone")}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-6 col-12">
                    <div className="form-field">
                      <input
                        value={formData.address}
                        type="address"
                        name="contactLocation"
                        onBlur={(e) => handleInputChange(e)}
                        onChange={(e) => handleInputChange(e)}
                        placeholder={t("FormAddress")}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-12 col-12">
                    <textarea
                      onBlur={(e) => handleInputChange(e)}
                      onChange={(e) => handleInputChange(e)}
                      value={formData.note}
                      type="text"
                      name="note"
                      placeholder={t("FormMessage")}
                    ></textarea>
                  </div>
                </div>
                <div className="submit-area">
                  <Button onClick={handleSubmit} type="submit" sx={{ p: 0 }}>
                    <span className="theme-btn px-4">{t("FormSubmit")}</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
