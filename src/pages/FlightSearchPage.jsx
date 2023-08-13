import React, { useEffect, useState } from "react";
import Layout from "../components/global/Layout";
import CtaSection from "../components/sections/CtaSection";
import FilterPrice from "../components/inputs/FilterPrice";
import FormSection from "../components/sections/FormSection";
import CommonBannerSection from "../components/sections/CommonBannerSection";
import FlightCard from "../components/cards/FlightCard";
import { Flightstate } from "../context/Flightprovider";
import BookDate from "../components/inputs/BookDate";
import { useNavigate } from "react-router-dom";
import StepComponent from "../components/steps/StepComponent";

const steps = [
  { stepNumber: 1, text: "search results", active: true },
  { stepNumber: 2, text: "checkout" },
  { stepNumber: 3, text: "booking and payment" },
  // { stepNumber: 4, text: "Payment" },
  // { stepNumber: 5, text: "your flight" },
];

const FlightSearchPage = () => {
  const [editFlight, setEditFlight] = useState(false);
  const {
    data,
    fullOrigin,
    fullDestination,
    departureDate,
    returnDate,
    passenger,
    loading,
  } = Flightstate();
  const navigate = useNavigate();

  useEffect(() => {
    if (fullOrigin === "" && fullDestination === "" && loading === false) {
      navigate("/");
    }
  }, [data, loading]);

  return (
    <Layout>
      {/* Common Banner Area */}
      {/* <CommonBannerSection
        title="Flight search result"
        pageName="Flight search result"
      /> */}
      <section className="bg-white shadow-sm border-bottom">
        <div className="container">
          <ul className="nav gap-4 flex-nowrap overflow-auto">
            {steps.map((step) => (
              <StepComponent
                key={step.stepNumber}
                stepNumber={step.stepNumber}
                text={step.text}
                active={step.active}
              />
            ))}
          </ul>
        </div>
      </section>
      {/* Form Area */}
      <section className="mt-0" id="theme_search_form_tour">
        {editFlight && (
          <FormSection
            marginTop
            classBox="rounded-0 border-bottom shadow-none"
          />
        )}
        <div
          className={`bg-white shadow-sm ${editFlight ? "mt-0" : "mt-0"}`}
          id="theme_search_form"
          // style={{ marginTop: "-24px" }}
        >
          <div className="container">
            <div className="theme_search_form_area rounded-0 shadow-none d-flex flex-wrap align-items-center gap-3">
              <div className="d-flex flex-column flex-md-row text-center text-md-start align-items-md-center gap-3 mx-auto me-md-auto ms-md-0">
                <div>
                  <i class="fas fa-plane-departure fs-5"></i>
                </div>
                <div>
                  <div className="d-flex flex-column flex-md-row text-center text-md-start align-items-center gap-2 h6 mb-2 fw-semibold">
                    <span>{fullOrigin?.label}</span>
                    <span className="d-none d-md-block">
                      <i class="fas fa-arrow-right fs-6"></i>
                    </span>
                    <span>{fullDestination?.label}</span>
                  </div>
                  <div className="small text-black-50">
                    {departureDate} |{" "}
                    {passenger?.adult + passenger?.child + passenger?.infant}{" "}
                    Passenger
                  </div>
                </div>
              </div>
              <div className="px-0 col-12 col-md-auto">
                <button
                  type="button"
                  onClick={() => setEditFlight(!editFlight)}
                  className="btn w-100 py-2 px-3 btn-outline-primary"
                >
                  <span className="me-2">
                    <i className="fas fa-edit"></i>
                  </span>
                  <span>Change Flight</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Flight Search Areas */}
      <section id="explore_area" className="section_padding">
        <div className="container">
          {/* Section Heading */}

          <div className="row">
            <div className="col-lg-3">
              <FilterPrice />
            </div>
            <div className="col-lg-9">
              <div className="mb-4">
                <BookDate />
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="flight_search_result_wrapper">
                    <FlightCard />
                  </div>
                  <div className="load_more_flight"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </Layout>
  );
};

export default FlightSearchPage;
