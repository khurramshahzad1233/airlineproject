import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import HotelCard from "../cards/HotelCard";

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

const ExploreSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredHotels =
    activeTab === "all"
      ? hotels
      : hotels.filter((hotel) => hotel.type === activeTab);

  return (
    <section id="explore_area" className="section_padding_top">
      <div className="container">
        {/* Section Heading */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Explore our hot deals</h2>
            </div>
          </div>
        </div>
        <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
          <div className="col-lg-6 offset-lg-3">
            <div className="theme_nav_tab">
              <div className="theme_nav_tab_item">
                <Nav variant="tabs" className="gap-2 gap-md-4">
                  <Nav.Item>
                    <Nav.Link eventKey="all">Hotels</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tours">Tours</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="space">Space</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="events">Events</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
          </div>
          <Tab.Content>
            <Tab.Pane eventKey="all">
              <div className="row">
                {filteredHotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-12"
                  >
                    <HotelCard items={hotel} />
                  </div>
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="tours">
              <div className="row">
                {filteredHotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-12"
                  >
                    <HotelCard items={hotel} />
                  </div>
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="space">
              <div className="row">
                {filteredHotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-12"
                  >
                    <HotelCard items={hotel} />
                  </div>
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="events">
              <div className="row">
                {filteredHotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-12"
                  >
                    <HotelCard items={hotel} />
                  </div>
                ))}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </section>
  );
};

export default ExploreSection;
