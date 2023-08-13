import React, { useEffect } from "react";
import Layout from "../components/global/Layout";
import CommonBannerSection from "../components/sections/CommonBannerSection";
import { Accordion } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Flightstate } from "../context/Flightprovider";
import StepComponent from "../components/steps/StepComponent";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const steps = [
    { stepNumber: 1, text: "search results" },
    { stepNumber: 2, text: "checkout", active: true },
    { stepNumber: 3, text: "booking and payment" },
    // { stepNumber: 4, text: "Payment" },
    // { stepNumber: 5, text: "your flight" },
  ];
  const {
    data,
    fullOrigin,
    fullDestination,
    departureDate,
    returnDate,
    passenger,
    loading,
    bookingData,
  } = Flightstate();

  useEffect(() => {
    if (bookingData.length === 0) {
      navigate("/");
    }
  }, [bookingData]);

  console.log("booking", bookingData);

  const formatDuration = (duration) => {
    // Check if the duration is in the correct format (e.g., "PT5H35M", "PT10H", or "P1DT40M")
    const durationPattern = /^P(\d+D)?T?(\d+H)?(\d+M)?$/;
    const matches = duration.match(durationPattern);

    if (!matches) {
      throw new Error(
        'Invalid duration format. Expected "PT5H35M", "PT10H", or "P1DT40M".'
      );
    }

    const days = matches[1] ? parseInt(matches[1]) : 0;
    const hours = matches[2] ? parseInt(matches[2]) : 0;
    const minutes = matches[3] ? parseInt(matches[3]) : 0;

    // Create a human-readable format
    let formattedDuration = "";
    if (days > 0) {
      formattedDuration += `${days} day${days === 1 ? "" : "s"}`;
    }
    if (hours > 0) {
      formattedDuration += `${days > 0 ? " " : ""}${hours} hour${
        hours === 1 ? "" : "s"
      }`;
    }
    if (minutes > 0) {
      formattedDuration += `${
        days > 0 || hours > 0 ? " " : ""
      }${minutes} minute${minutes === 1 ? "" : "s"}`;
    }

    return formattedDuration;
  };

  const timeFormatter = (date, type) => {
    const dateTimeString = new Date(date).toISOString();
    const dateTime = new Date(date);
    const dateString = dateTimeString.slice(0, 10);
    const timeString = dateTimeString.slice(11, 16);
    const monthNames = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    const day = dateTime.getDate();
    const month = monthNames[dateTime.getMonth()];
    const year = dateTime.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    if (type === "date") return formattedDate;

    if (type === "time") return timeString;
  };

  return (
    <>
      {bookingData.length !== 0 && (
        <Layout>
          {/* <CommonBannerSection title="Checkout" pageName="Checkout" /> */}
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
          <section className="section_padding">
            <div className="container">
              <div className="row">
                <div className="col-12 col-xl-8">
                  <div className="d-flex flex-column gap-4">
                    {bookingData?.slices &&
                      bookingData.slices.map((flight, index) => (
                        <div key={index}>
                          {" "}
                          {flight?.segments &&
                            flight?.segments.map((seg, index) => (
                              <div
                                key={index}
                                className="detail-card tour_details_right_boxed"
                              >
                                <h6 className="mb-2 text-center text-md-start">
                                  Selected Departure Flight
                                </h6>
                                <div className="d-flex flex-wrap align-items-center gap-2">
                                  <div className="mx-auto me-md-auto ms-md-0">
                                    <div className="d-flex flex-column flex-md-row text-center text-md-start align-items-center gap-2 h6 mb-2 fw-semibold">
                                      <span>{seg?.origin?.name}</span>
                                      <span className="d-none d-md-block">
                                        <i className="fas fa-arrow-right fs-6" />
                                      </span>
                                      <span>{seg?.destination?.name}</span>
                                    </div>
                                    <div className="small text-black-50">
                                      {departureDate}|{" "}
                                      {bookingData?.passengers?.length}{" "}
                                      Passenger
                                    </div>
                                  </div>
                                  <div className="px-0 col-12 col-md-auto">
                                    <button
                                      type="button"
                                      disabled
                                      className="btn w-100 py-2 px-3 btn-outline-primary"
                                    >
                                      <span className="me-2">
                                        <i className="fas fa-edit" />
                                      </span>
                                      <span>Change Flight</span>
                                    </button>
                                  </div>
                                </div>
                                {/* == */}
                                <div className="flight_multis_area_wrapper flight_search_items justify-content-start mt-3">
                                  <div className="flight_search_left">
                                    <div className="flight_logo">
                                      <img
                                        src={
                                          bookingData?.owner?.logo_symbol_url
                                        }
                                        alt="img"
                                      />
                                    </div>
                                    <div className="flight_search_destination">
                                      <p>From</p>
                                      <h3>{seg?.origin?.city_name}</h3>
                                      <h6>{seg?.origin?.name}</h6>
                                      <h6>({seg?.origin?.iata_code})</h6>
                                      <h6>Terminal {seg?.origin_terminal}</h6>
                                      <h6>
                                        {timeFormatter(
                                          seg?.departing_at,
                                          "date"
                                        )}{" "}
                                        ,{" "}
                                        {timeFormatter(
                                          seg?.departing_at,
                                          "time"
                                        )}
                                      </h6>
                                      {/* <h6>
                              {" "}
                              {timeFormatter(
                                bookingData?.slices[0]?.segments[0]
                                  ?.departing_at,
                                "time"
                              )}{" "}
                              /{" "}
                              {
                                bookingData?.slices[0]?.segments[0]?.origin
                                  ?.time_zone
                              }
                            </h6> */}
                                    </div>
                                  </div>
                                  <div className="flight_search_middel me-auto">
                                    <div className="flight_right_arrow">
                                      <img
                                        className="img-color"
                                        src="https://andit.co/projects/html/and-tour/demo/assets/img/icon/right_arrow.png"
                                        alt="icon"
                                      />
                                      <h6>Non-stop</h6>
                                      <p>{formatDuration(seg?.duration)}</p>
                                    </div>
                                    <div className="flight_search_destination">
                                      <p>To</p>
                                      <h3>{seg?.destination?.city_name} </h3>
                                      <h6>{seg?.destination?.name}</h6>
                                      <h6>({seg?.destination?.iata_code})</h6>
                                      <h6>
                                        Terminal {seg?.destination_terminal}
                                      </h6>
                                      <h6>
                                        {timeFormatter(
                                          seg?.arriving_at,
                                          "date"
                                        )}{" "}
                                        ,{" "}
                                        {timeFormatter(
                                          seg?.arriving_at,
                                          "time"
                                        )}
                                      </h6>
                                      {/* <h6>
                              {" "}
                              {timeFormatter(
                                bookingData?.slices[0]?.segments[0]
                                  ?.arriving_at,
                                "time"
                              )}
                              {
                                bookingData?.slices[0]?.segments[0]?.destination
                                  ?.time_zone
                              }
                            </h6> */}
                                    </div>
                                  </div>
                                  <div className="p-2">
                                    <ul className="nav flex-nowrap flex-column gap-1 col-8 col-md-12 mx-auto px-0">
                                      {seg?.passengers[0]?.baggages &&
                                        seg?.passengers[0]?.baggages.map(
                                          (item) => (
                                            <li>
                                              <div className="d-flex align-items-center gap-2 text-muted small">
                                                <i
                                                  className={
                                                    item.type === "checked"
                                                      ? "fas fa-weight"
                                                      : "fas fa-weight-hanging"
                                                  }
                                                ></i>
                                                {item.type === "checked" ? (
                                                  <span>Cabin Baggage 7kg</span>
                                                ) : (
                                                  <span>Luggage 20kg</span>
                                                )}
                                              </div>
                                            </li>
                                          )
                                        )}

                                      <li>
                                        <div className="d-flex align-items-center gap-2 text-primary small">
                                          <i className="fas fa-check-circle"></i>
                                          <span>
                                            Cabin Class{" "}
                                            {
                                              seg?.passengers[0]
                                                ?.cabin_class_marketing_name
                                            }
                                          </span>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-12 col-xl-4 mt-4 mt-xl-0">
                  <div
                    className="tour_details_right_sidebar_wrapper sticky-top"
                    style={{ top: 80 }}
                  >
                    <div className="tour_detail_right_sidebar">
                      <div className="tour_details_right_boxed">
                        <div className="tour_details_right_box_heading">
                          <h3>Price Details</h3>
                          <div className="mt-3 price-details">
                            <Accordion>
                              <Accordion.Item eventKey="depart">
                                <Accordion.Header>
                                  <div className="small fw-semibold d-flex gap-2 w-100 me-2">
                                    <div className="me-auto">
                                      Depart (
                                      {
                                        bookingData?.slices[0]?.origin
                                          ?.iata_city_code
                                      }{" "}
                                      &#8674;{" "}
                                      {
                                        bookingData?.slices[0]?.destination
                                          ?.iata_city_code
                                      }
                                      )
                                    </div>
                                    <div>
                                      {bookingData?.total_currency}{" "}
                                      {bookingData?.total_amount}
                                    </div>
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="d-flex gap-2 small text-black-50">
                                    {bookingData?.passengers.map((v) => (
                                      <span className="me-auto text-capitalize">
                                        {v.type} ×1
                                      </span>
                                    ))}

                                    <span>
                                      {bookingData?.total_currency}{" "}
                                      {bookingData?.total_amount}
                                    </span>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </div>

                          <div className="mt-3 d-flex gap-2">
                            <h5 className="mb-0  me-auto">Tax Price</h5>
                            <div className="items-end">
                              <p className=" text-medium text-primary text-end mb-0">
                                {bookingData?.tax_amount}{" "}
                                {bookingData?.tax_currency}
                              </p>
                              {/* <p className="mb-0 text-black-50 small text-end">
                                {bookingData?.total_currency}
                              </p> */}
                            </div>
                          </div>
                          <div className="mt-3 d-flex gap-2">
                            <h5 className="mb-0 fw-semibold me-auto">
                              Total Price
                            </h5>
                            <div className="items-end">
                              <p className="fw-semibold text-medium text-primary text-end mb-0">
                                {bookingData?.total_currency}{" "}
                                {bookingData?.total_amount}
                              </p>
                              {/* <p className="mb-0 text-black-50 small text-end">
                                {bookingData?.total_currency}
                              </p> */}
                            </div>
                          </div>
                          <div className="mt-3">
                            <Link
                              type="button"
                              to="/flight-booking"
                              className="w-100 py-2 fw-bold btn btn_theme"
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      )}
    </>
  );
};

export default CheckoutPage;
