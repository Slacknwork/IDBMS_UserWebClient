"use client";

import blogs from "/api/blogs";
import Link from "next/link";
import SectionTitle3 from "/components/shared/SectionTitle3";
import bShape1 from "/public/images/blog/Vector3.png";
import bShape2 from "/public/images/blog/Vector4.png";
import Image from "next/image";

export default function Projects() {
  return (
    <section className="wpo-blog-section-s2 section-padding" id="blog">
      <div className="container">
        <SectionTitle3 subTitle={"Our Blog"} MainTitle={"Our Latest News"} />
        <div className="wpo-blog-items">
          <div className="row">
            {blogs.slice(0, 3).map((blog, Bitem) => (
              <div className="col col-lg-4 col-md-6 col-12" key={Bitem}>
                <div className="wpo-blog-item">
                  <div className="wpo-blog-img">
                    <Image src={blog.screens} alt="" />
                    <div className="thumb">{blog.thumb}</div>
                  </div>
                  <div className="wpo-blog-content">
                    <ul>
                      <li>{blog.create_at}</li>
                      <li>
                        By{" "}
                        <Link
                          href="/blog-single/[slug]"
                          as={`/blog-single/${blog.slug}`}
                        >
                          {blog.author}
                        </Link>
                      </li>
                    </ul>
                    <h2>
                      <Link
                        href="/blog-single/[slug]"
                        as={`/blog-single/${blog.slug}`}
                      >
                        {blog.title}
                      </Link>
                    </h2>
                    <p>{blog.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="vector-1">
        <Image src={bShape1} alt="" />
      </div>
      <div className="vector-2">
        <Image src={bShape2} alt="" />
      </div>
    </section>
  );
}
