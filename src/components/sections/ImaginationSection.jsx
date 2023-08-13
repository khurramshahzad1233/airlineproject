import React from "react";
import { Link } from "react-router-dom";

const ImaginationSection = () => {
  const imaginationData = [
    {
      image:
        "https://andit.co/projects/html/and-tour/demo/assets/img/imagination/imagination1.png",
      title: "7% Discount for all Airlines",
      link: "/discounts",
    },
    {
      image:
        "https://andit.co/projects/html/and-tour/demo/assets/img/imagination/imagination2.png",
      title: "Travel around the world",
      link: "/travel",
    },
    {
      image:
        "https://andit.co/projects/html/and-tour/demo/assets/img/imagination/imagination3.png",
      title: "Luxury resorts top deals",
      link: "/resorts",
    },
  ];

  return (
    <section id="go_beyond_area" className="section_padding_top">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="heading_left_area">
              <h2>
                Go beyond your <span>imagination</span>
              </h2>
              <h5>Discover your ideal experience with us</h5>
            </div>
          </div>
          {imaginationData.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
              <div className="imagination_boxed">
                <Link to={item.link}>
                  <img src={item.image} alt="img" />
                </Link>
                <h3>
                  <Link to={item.link}>{item.title}</Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImaginationSection;
