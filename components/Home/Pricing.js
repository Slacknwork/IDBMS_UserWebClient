"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { toast } from "react-toastify";

import { getAllRoomTypes } from "/services/roomTypeServices";

import SectionTitle2 from "/components/Shared/SectionTitle2";

export default function Pricing() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const [roomTypes, setRoomTypes] = useState([]);

  const fetchRoomTypes = async () => {
    try {
      const data = await getAllRoomTypes({});
      setRoomTypes(data.list);
    } catch (error) {
      toast.error("Error getting Room Type data!");
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
          subTitle={"Room types"}
          MainTitle={"Choose Your Room Type"}
          vText={"Pricing Plan"}
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
                              <span>{roomType.name}</span>
                            </div>
                            <div>
                              <Image
                                className="mx-auto mt-4"
                                src={roomType.imageUrl}
                                alt={roomType.name}
                                width={1000}
                                height={1000}
                                priority
                                style={{ objectFit: "cover" }}
                              ></Image>
                            </div>
                            <div className="wpo-pricing-text">
                              <h2>
                                {roomType.pricePerArea?.toLocaleString("vi-VN")}
                                đ<span>/m²</span>
                              </h2>
                              <p>
                                {roomType.estimateDayPerArea} days of work/m²
                              </p>
                            </div>
                          </div>
                          <div
                            className="wpo-pricing-bottom"
                            style={{ height: 150 }}
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
