"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { toast } from "react-toastify";

import { getAllRoomTypes } from "/services/roomTypeServices";

import SectionTitle2 from "/components/Shared/SectionTitle2";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function Pricing() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const t = useTranslations("Home");
  const e = useTranslations("Error");
  const params = useParams();

  const language =
    params?.locale === "en-US"
      ? "english"
      : params?.locale === "vi-VN"
      ? "vietnamese"
      : "";

  const [roomTypes, setRoomTypes] = useState([]);

  const fetchRoomTypes = async () => {
    try {
      const data = await getAllRoomTypes({});
      setRoomTypes(data.list);
    } catch (error) {
      toast.error(e("ErrorGettingRoomType"));
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return (
    <section className="wpo-pricing-section" style={{ marginBottom: "6rem" }}>
      <div className="container">
        <SectionTitle2
          subTitle={t("RoomTypes")}
          MainTitle={t("RoomTypesText")}
          vText={t("PricingPlan")}
        />
        <div className="wpo-project-area">
          <div className="wpo-project-wrap project-active owl-carousel">
            <Slider {...settings}>
              {roomTypes &&
                roomTypes.length > 0 &&
                roomTypes.map((roomType) => (
                  <div className="wpo-pricing-wrap px-3 my-4" key={roomType.id}>
                    <div className="row">
                      <div className="col col-lg-12 col-md-12 col-12">
                        <div className="wpo-pricing-item bg-white">
                          <div className="wpo-pricing-top">
                            <div className="pricing-thumb">
                              <span>
                                {language === "english"
                                  ? roomType.englishName ?? roomType.name
                                  : roomType.name}
                              </span>
                            </div>
                            <div>
                              {roomType?.imageUrl && (
                                <Image
                                  className="mx-auto mt-4"
                                  src={roomType.imageUrl}
                                  alt={roomType.name}
                                  width={1000}
                                  height={1000}
                                  priority
                                  style={{ objectFit: "cover" }}
                                ></Image>
                              )}
                            </div>
                            <div className="wpo-pricing-text">
                              <h2>
                                {roomType.pricePerArea?.toLocaleString("vi-VN")}
                                đ<span>/m²</span>
                              </h2>
                              <p>
                                {roomType.estimateDayPerArea} {t("DaysOfWork")}
                                /m²
                              </p>
                            </div>
                          </div>
                          <div
                            className="wpo-pricing-bottom"
                            style={{ height: 200 }}
                          >
                            <div className="wpo-pricing-bottom-text">
                              <ul>
                                <li>{roomType.description}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="invisible-title1">
        <h2>Pricing</h2>
      </div>
    </section>
  );
}
