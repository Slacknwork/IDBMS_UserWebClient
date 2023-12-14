import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="wpo-about-area section-padding wpo-about-area-s5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="wpo-about-img" style={{ height: 650 }}>
              <Image
                src="/images/samples/home-about.jpeg"
                fill
                alt="logo"
                style={{ objectFit: "cover", padding: "1.5rem" }}
              />
            </div>
          </div>
          <div className="col-lg-7 col-md-12 colsm-12">
            <div className="wpo-about-text">
              <div className="wpo-about-title">
                <span>About Us</span>
                <h2>IDT Decor Design & Decoration</h2>
              </div>
              <p>
                We specialize in providing interior design services and interior
                construction: Interior Construction of Banks, Offices, Houses,
                Shops, Showrooms. With a team of experienced architects in the
                profession, have implemented many domestic and foreign projects.
              </p>
              <div className="btns">
                <Link href="/about" className="theme-btn">
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
}
