import React from "react";

const destinations1 = [
  {
    name: "China",
    image:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination1.png",
    link: "top-destinations.html",
  },
  {
    name: "Darjeeling",
    image:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination2.png",
    link: "top-destinations.html",
  },
  {
    name: "Malaysia",
    image:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination3.png",
    link: "top-destinations.html",
  },
];

const destinations2 = [
  {
    name: "Gangtok",
    image:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination4.png",
    link: "top-destinations.html",
  },
  {
    name: "Thailand",
    image:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination5.png",
    link: "top-destinations.html",
  },
  {
    name: "Australia",
    image:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination6.png",
    link: "top-destinations.html",
  },
];

const destinations3 = [
  {
    name: "London",
    image:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination7.png",
    link: "top-destinations.html",
  },
  {
    name: "USA",
    image:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination8.png",
    link: "top-destinations.html",
  },
];

const TopDestinationSection = () => {
  return (
    <section id="top_destinations" className="section_padding_top">
      <div className="container">
        {/* Section Heading */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Top destinations</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="destinations_content_box img_animation">
              <img
                src="https://andit.co/projects/html/and-tour/demo/assets/img/destination/big-img.png"
                alt="img"
              />
              <div className="destinations_content_inner">
                <h2>Up to</h2>
                <div className="destinations_big_offer">
                  <h1>50</h1>
                  <h6>
                    <span>%</span> <span>Off</span>
                  </h6>
                </div>
                <h2>Holiday packages</h2>
                <a
                  href="top-destinations.html"
                  className="btn btn_theme btn_md"
                >
                  Book now
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                {destinations1.map((destination, index) => (
                  <div
                    className="destinations_content_box img_animation"
                    key={index}
                  >
                    <a href={destination.link}>
                      <img src={destination.image} alt="img" />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href={destination.link}>{destination.name}</a>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                {destinations2.map((destination, index) => (
                  <div
                    className="destinations_content_box img_animation"
                    key={index}
                  >
                    <a href={destination.link}>
                      <img src={destination.image} alt="img" />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href={destination.link}>{destination.name}</a>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                {destinations3.map((destination, index) => (
                  <div
                    className="destinations_content_box img_animation"
                    key={index}
                  >
                    <a href={destination.link}>
                      <img src={destination.image} alt="img" />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href={destination.link}>{destination.name}</a>
                      </h3>
                    </div>
                  </div>
                ))}
                <div className="destinations_content_box">
                  <a
                    href="top-destinations.html"
                    className="btn btn_theme btn_md w-100"
                  >
                    View all
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDestinationSection;
