import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import DestinationCard from "../cards/DestinationCard";

const destinations = [
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small1.png",
    title: "Everest trek to Base Camp",
    price: "$99.00",
    type: "nepal",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small2.png",
    title: "Kathmundu tour",
    price: "$99.00",
    type: "nepal",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small3.png",
    title: "Beautiful pokhara",
    price: "$99.00",
    type: "nepal",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small4.png",
    title: "Annapurna region",
    price: "$99.00",
    type: "nepal",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small5.png",
    title: "Chitwan national park",
    price: "$99.00",
    type: "nepal",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small6.png",
    title: "Langtang region",
    price: "$99.00",
    type: "nepal",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small1.png",
    title: "Everest trek to Base Camp",
    price: "$99.00",
    type: "malaysia",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small2.png",
    title: "Kathmundu tour",
    price: "$99.00",
    type: "malaysia",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small5.png",
    title: "Chitwan national park",
    price: "$99.00",
    type: "indonesia",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small6.png",
    title: "Langtang region",
    price: "$99.00",
    type: "indonesia",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small3.png",
    title: "Beautiful pokhara",
    price: "$99.00",
    type: "turkey",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small6.png",
    title: "Langtang region",
    price: "$99.00",
    type: "darjeeling",
  },
  {
    imageURL:
      "https://andit.co/projects/html/and-tour/demo/assets/img/destination/destination-small3.png",
    title: "Beautiful pokhara",
    price: "$99.00",
    type: "italy",
  },
  // Add more destination objects here...
];

const DestinationSection = () => {
  const [activeTab, setActiveTab] = useState("nepal");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const filteredDestinations = destinations.filter(
    (destination) => destination.type === activeTab
  );

  return (
    <section id="destinations_area" className="section_padding_top">
      <div className="container">
        {/* Section Heading */}
        <div className="section_heading_center">
          <h2>Destinations for you</h2>
        </div>
        <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
          <div className="col-lg-10 offset-lg-1">
            <div className="theme_nav_tab">
              <div className="theme_nav_tab_item">
                <Nav variant="tabs" className="gap-2 gap-md-4">
                  <Nav.Item>
                    <Nav.Link eventKey="nepal">Nepal</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="malaysia">Malaysia</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="indonesia">Indonesia</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="turkey">Turkey</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="darjeeling">Darjeeling</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="italy">Italy</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
          </div>
          <Tab.Content>
            <Tab.Pane eventKey="nepal">
              <div className="row gy-4">
                {filteredDestinations.map((destination, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-6 col-sm-12 col-12"
                  >
                    <DestinationCard items={destination} />
                  </div>
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="malaysia">
              <div className="row gy-4">
                {filteredDestinations.map((destination, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-6 col-sm-12 col-12"
                  >
                    <DestinationCard items={destination} />
                  </div>
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="indonesia">
              <div className="row gy-4">
                {filteredDestinations.map((destination, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-6 col-sm-12 col-12"
                  >
                    <DestinationCard items={destination} />
                  </div>
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="turkey">
              <div className="row gy-4">
                {filteredDestinations.map((destination, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-6 col-sm-12 col-12"
                  >
                    <DestinationCard items={destination} />
                  </div>
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="darjeeling">
              <div className="row gy-4">
                {filteredDestinations.map((destination, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-6 col-sm-12 col-12"
                  >
                    <DestinationCard items={destination} />
                  </div>
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="italy">
              <div className="row gy-4">
                {filteredDestinations.map((destination, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-6 col-sm-12 col-12"
                  >
                    <DestinationCard items={destination} />
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

export default DestinationSection;
