import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import { Link } from "react-router-dom";

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Keyboard, Autoplay]);

const partnerImages = [
  "/assets/img/Airlines/partner-1.png",
  "/assets/img/Airlines/partner-2.png",
  "/assets/img/Airlines/partner-3.png",
  "/assets/img/Airlines/partner-4.png",
  "/assets/img/Airlines/partner-5.png",
  "/assets/img/Airlines/partner-6.png",
  "/assets/img/Airlines/partner-7.png",
  "/assets/img/Airlines/partner-8.png",
  "/assets/img/Airlines/partner-9.png",
  "/assets/img/Airlines/partner-10.png",
  "/assets/img/Airlines/partner-11.png",
  "/assets/img/Airlines/partner-12.png",
  "/assets/img/Airlines/partner-13.png",
  "/assets/img/Airlines/partner-14.png",
  "/assets/img/Airlines/partner-15.png",
  "/assets/img/Airlines/partner-16.png",
];

const OurPartnersSection = () => {
  const options = {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    navigation: false,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 8,
      },
    },
  };

  return (
    <section id="our_partners" className="py-4">
      <div className="container">
        {/* Section Heading */}
        <Swiper className="partner_slider_area" {...options}>
          {partnerImages.map((partner, index) => (
            <SwiperSlide key={`partner-${index}`}>
              <div className="partner_logo">
                <Link to>
                  <img src={partner} alt="logo" />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurPartnersSection;
