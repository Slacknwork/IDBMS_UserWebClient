import Link from "next/link";
import Image from "next/image";

export default function AboutProjects() {
  return (
    <div className="wpo-about-area section-padding wpo-about-area-s5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div
              className="wpo-about-text"
              style={{ paddingRight: "10rem", paddingLeft: "3rem" }}
            >
              <div className="wpo-about-title">
                <span>Projects</span>
                <h2>IDT Projects</h2>
              </div>
              <h5>
                Interior design and construction that our IDT has implemented
                for investors.
              </h5>
              <p>
                With more than 17 years of interior design experience with many
                large and small banks such as Military Bank MBbank, OCB bank,
                SCB, ANZ bank, Standar charterd bank … IDT Decor is proud to be
                a leader in the field of interior design. Bank interior, helping
                the units have a unique, modern, luxurious space and ensure the
                unique style of each bank.
              </p>
              <br />
              <p>
                IDT is the leading professional office interior design company
                in Vietnam. The company is voted by the customer association as
                one of the prestigious units in the field of office interior
                design consultancy and construction.
              </p>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="wpo-about-img" style={{ height: 650 }}>
              <Image
                src="/images/samples/about-projects.jpg"
                fill
                alt="logo"
                style={{ objectFit: "cover", padding: "1.5rem" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
