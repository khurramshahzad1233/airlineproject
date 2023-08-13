import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import HotelCard from "../cards/HotelCard";

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Keyboard, Autoplay]);

const hotels = [
  {
    imgSrc:
      "https://andit.co/projects/html/and-tour/demo/assets/img/tab-img/hotel1.png",
    location: "New beach, Thailand",
    hotelName: "Kantua hotel, Thailand",
    rating: "4.8/5 Excellent",
    reviewCount: "(1214 reviews)",
    price: "$99.00",
    type: "tours",
  },
  {
    imgSrc:
      "https://andit.co/projects/html/and-tour/demo/assets/img/tab-img/hotel2.png",
    location: "Indonesia",
    hotelName: "Hotel paradise international",
    rating: "4.8/5 Excellent",
    reviewCount: "(1214 reviews)",
    price: "$99.00",
    discount: "50",
    type: "tours",
  },
  {
    imgSrc:
      "https://andit.co/projects/html/and-tour/demo/assets/img/tab-img/hotel3.png",
    location: "Kualalampur",
    hotelName: "Hotel kualalampur",
    rating: "4.8/5 Excellent",
    reviewCount: "(1214 reviews)",
    price: "$99.00",
    type: "tours",
  },
  {
    imgSrc:
      "https://andit.co/projects/html/and-tour/demo/assets/img/tab-img/hotel4.png",
    location: "New beach, Thailand",
    hotelName: "Kantua hotel, Thailand",
    rating: "4.8/5 Excellent",
    reviewCount: "(1214 reviews)",
    price: "$99.00",
    type: "space",
  },
  {
    imgSrc:
      "https://andit.co/projects/html/and-tour/demo/assets/img/tab-img/hotel5.png",
    location: "Indonesia",
    hotelName: "Hotel paradise international",
    rating: "4.8/5 Excellent",
    reviewCount: "(1214 reviews)",
    price: "$99.00",
    discount: "20",
    type: "space",
  },
  {
    imgSrc:
      "https://andit.co/projects/html/and-tour/demo/assets/img/tab-img/hotel6.png",
    location: "Kualalampur",
    hotelName: "Hotel kualalampur",
    rating: "4.8/5 Excellent",
    reviewCount: "(1214 reviews)",
    price: "$99.00",
    type: "events",
  },
  {
    imgSrc:
      "https://andit.co/projects/html/and-tour/demo/assets/img/tab-img/hotel7.png",
    location: "Indonesia",
    hotelName: "Hotel paradise international",
    rating: "4.8/5 Excellent",
    reviewCount: "(1214 reviews)",
    price: "$99.00",
    discount: "60",
    type: "events",
  },
  {
    imgSrc:
      "https://andit.co/projects/html/and-tour/demo/assets/img/tab-img/hotel8.png",
    location: "Kualalampur",
    hotelName: "Hotel kualalampur",
    rating: "4.8/5 Excellent",
    reviewCount: "(1214 reviews)",
    price: "$99.00",
  },
  // Add more hotel objects here...
];
const PromotionalToursSection = () => {
  const options = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: false,
    keyboard: { enabled: true },
    pagination: { clickable: true },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  };

  return (
    <section id="promotional_tours" className="section_padding_top">
      <div className="container">
        {/* Section Heading */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Our best promotional tours</h2>
            </div>
          </div>
        </div>
        <Swiper {...options} className="pt-2 pb-4">
          {hotels.map((hotel, index) => (
            <SwiperSlide key={index}>
              <HotelCard items={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PromotionalToursSection;
