import React from "react";
import Link from "next/link";
import VideoModal from "../../components/ModalVideo/VideoModal";
import Image from "next/image";

const About = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  return (
    <div className={`wpo-about-area section-padding ${props.abClass}`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="wpo-about-img">
              <Image src={props.abimg} alt="logo" />
            </div>
          </div>
          <div className="col-lg-7 col-md-12 colsm-12">
            <div className="wpo-about-text">
              <div className="wpo-about-title">
                <span>About Us</span>
                <h2>IDT Decor Design & Decoration</h2>
              </div>
              <h5>
                Over 25 years Liarch helping investors building their drea &
                business goals go to the perfection
              </h5>
              <p>
                We specialize in providing interior design services and interior
                construction: Interior Construction of Banks, Offices, Houses,
                Shops, Showrooms. With a team of experienced architects in the
                profession, have implemented many domestic and foreign projects.
              </p>
              <div className="btns">
                <Link
                  href="/about"
                  onClick={ClickHandler}
                  className="theme-btn"
                >
                  Discover More
                </Link>
                {/*<ul>
                  <li className="video-holder">
                    <VideoModal />
                  </li>
                  <li className="video-text">Watch Our Video</li>
                </ul>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
