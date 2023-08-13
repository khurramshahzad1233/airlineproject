import React from "react";
import CommonBannerSection from "../components/sections/CommonBannerSection";
import Layout from "../components/global/Layout";
import AirlineCard from "../components/cards/AirlineCard";

const airlines = [
  {
    name: "Aegean Airlines",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/A3.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Air Canada",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/AC.svg?v=1",
    comingSoon: true,
  },
  {
    name: "Air France",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/AF.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "American Airlines",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/AA.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
    ],
  },
  {
    name: "Austrian Airlines",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/OS.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-chair", title: "Selecting a seat when booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Avianca",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/AV.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "British Airways",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/BA.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-chair", title: "Selecting a seat when booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Brussels Airlines",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/SN.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-chair", title: "Selecting a seat when booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Copa Airlines",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/CM.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "easyJet",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/U2.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-chair", title: "Selecting a seat when booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Emirates",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/EK.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Eurowings Discover",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/4Y.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-chair", title: "Selecting a seat when booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Hawaiian Airlines",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/HA.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-chair", title: "Selecting a seat when booking" },
    ],
  },
  {
    name: "Iberia",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/IB.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Iberia Express",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/I2.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Jetstar",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/JQ.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-chair", title: "Selecting a seat when booking" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "KLM",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/KL.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-chair", title: "Selecting a seat when booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "LATAM",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/LA.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "LEVEL",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/LV.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Lufthansa",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/LH.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-retweet", title: "Refunds and cancellation" },
      { icon: "fa-chair", title: "Selecting a seat when booking" },
      { icon: "fa-star", title: "Loyalty programmes" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
];

const travelport = [
  {
    name: "Aer Lingus",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/EI.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Aerolíneas Argentinas",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/AR.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Aeromar",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/VW.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Air Algérie",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/AH.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Air Austral",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/UU.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Air Botswana",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/BP.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Air Canada",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/AC.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Air China",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/CA.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Air Europa",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/UX.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
  {
    name: "Air Macau",
    logo: "https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/NX.svg?v=1",
    buttons: [
      { icon: "fa-search", title: "Searching and booking" },
      { icon: "fa-business-time", title: "Baggage allowance" },
    ],
  },
];

const AirlinesPage = () => {
  return (
    <Layout>
      {/* Common Banner Area */}
      <CommonBannerSection title="Our Airlines" pageName="Airlines" />
      <section className="py-5 bg-light flex-fill">
        <div className="container">
          {/* <div className="px-0 mx-auto col-lg-9 col-xl-7">
            <div className="row row-cols-1 row-cols-md-2 gy-3">
              <div>
                <select
                  id="continent-select"
                  className="form-select form-control border"
                >
                  <option value="All" selected>
                    All Continents
                  </option>
                  <option value="Africa">Africa</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>

              <div>
                <div className="position-relative">
                  <input
                    id="airlineSearchInput"
                    placeholder="Search"
                    type="text"
                    className="form-control border pe-5"
                  />
                  <span className="position-absolute top-50 translate-middle-y end-0 me-3">
                    <i class="fas fa-search text-black-50"></i>
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          {/* Direct Connect */}
          <div className="mt-5">
            {/* <div className="d-flex align-items-center gap-2 mb-4">
              <h2 className="mb-0 fw-semibold">Direct Connect</h2>
              <span className="badge bg-primary text-white">20</span>
            </div> */}
            <ul className="nav row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 gy-4">
              {airlines.map((airline, index) => (
                <li key={`airline-${index}`}>
                  <AirlineCard airline={airline} />
                </li>
              ))}
            </ul>
          </div>
          {/* Travelport */}
          <div className="mt-5">
            <div className="d-flex align-items-center gap-2 mb-4">
              <h2 className="mb-0 fw-semibold">Travelport</h2>
              <span className="badge bg-primary text-white">10</span>
            </div>
            <ul className="nav row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 gy-4">
              {travelport.map((airline, index) => (
                <li key={`travelport-${index}`}>
                  <AirlineCard airline={airline} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AirlinesPage;
