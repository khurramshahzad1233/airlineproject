import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flightstate } from "../../context/Flightprovider";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { Tab, Tabs } from "react-bootstrap";
import GuestModal from "../modals/GuestModal";

const FlightCard = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const {
    flightOffer,
    setBookingData,
    querrydata,
    data,
    setData,
    data1,
    setData1,
    airlinecheck,
    refund,
    price,
  } = Flightstate();
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  // console.log(airlinecheck);
  const itemPerPage = 6;
  let totalItems = data.length || 0;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const indexoflastitem = currentPage * itemPerPage;
  const indexoffirstitem = indexoflastitem - itemPerPage;

  const currentitems = data.slice(indexoffirstitem, indexoflastitem);
  const currentitems1 = data1.slice(indexoffirstitem, indexoflastitem);

  useEffect(() => {
    if (flightOffer.offers && flightOffer.offers.length >= 1) {
      setData(flightOffer.offers);
    }

    // if (!querrydata) {
    //   setData1("");
    // }
    if (querrydata && querrydata.length && querrydata.length >= 0) {
      setData1(querrydata);
    }
    if (querrydata.length === 0) {
      setData1("");
    }
  }, [flightOffer, querrydata, setData, setData1]);

  const bookFlightHandler = (e, bdata) => {
    setBookingData(bdata);
  };

  const handleNotLoggedIn = () => {
    toast.warn("Please log in to book flight");
  };

  const formatDuration = (duration) => {
    // console.log("duration", duration);

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

  useEffect(() => {
    if (!auth.uid) {
      setShow(true);
    }
  }, [auth]);

  return (
    <>
      <GuestModal show={show} onClose={() => setShow(false)} />
      {airlinecheck || refund || price[0] > 1 || price[1] < 15000 ? (
        <>
          {currentitems1 && currentitems1.length >= 1 ? (
            currentitems1.map((flight, index) => (
              <div className="flight_search_item_wrappper" key={index}>
                <div className="flight_search_items">
                  <div className="multi_city_flight_lists">
                    <div className="flight_multis_area_wrapper">
                      <div className="flight_search_left">
                        <div className="flight_logo">
                          <img src={flight.owner.logo_symbol_url} alt="img" />
                        </div>
                        <div className="flight_search_destination">
                          <p>From</p>
                          <h3>{flight?.slices[0]?.origin?.city_name}</h3>
                          <h6>{flight?.slices[0]?.origin?.name}</h6>
                        </div>
                      </div>
                      <div className="flight_search_middel">
                        <div className="flight_right_arrow">
                          <img
                            className="img-color"
                            src="assets/img/icon/right_arrow.png"
                            alt="icon"
                          />

                          <h6>Non-stop</h6>
                          <p>{formatDuration(flight?.slices[0]?.duration)} </p>
                        </div>
                        <div className="flight_search_destination">
                          <p>To</p>
                          <h3>{flight?.slices[0]?.destination?.city_name}</h3>
                          <h6>{flight?.slices[0]?.destination?.name}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flight_search_right">
                    <h2>$ {flight?.total_amount}</h2>
                    <Link
                      to="/checkout"
                      className="btn btn_theme btn_sm"
                      onClick={(e) => bookFlightHandler(e, flight)}
                    >
                      Book now
                    </Link>
                    <br />

                    {/* <p>*Discount applicable on some conditions</p> */}
                    <button
                      className="btn p-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseExample-${flight?.id}`}
                      aria-expanded="false"
                      aria-controls={`collapseExample-${flight?.id}`}
                    >
                      Show more <i className="fas fa-chevron-down" />
                    </button>
                  </div>
                </div>

                {/* slice section end here */}

                {/* SEGEMENT START HERE */}

                {flight.slices && (
                  <div>
                    <div
                      className="flight_policy_refund collapse mt-2"
                      id={`collapseExample-${flight?.id}`}
                      // key={index}
                    >
                      <Tabs defaultActiveKey="flight-detail" className="my-3">
                        <Tab eventKey="flight-detail" title={`Flight`}>
                          {flight.slices.map((slice, index) => (
                            <div>
                              {slice?.segments &&
                                slice?.segments?.map((seg, index) => (
                                  <div className="flight_show_down_wrapper justify-content-around gap-3">
                                    <div className="flight-shoe_dow_item">
                                      <div className="airline-details">
                                        <div className="img">
                                          <img
                                            src="assets/img/icon/bg.png"
                                            alt="img"
                                          />
                                        </div>
                                        <span className="airlineName fw-500">
                                          {seg?.aircraft?.name}
                                        </span>
                                        <span className="flightNumber">
                                          {seg?.aircraft?.name}
                                        </span>
                                      </div>
                                      <div className="flight_inner_show_component">
                                        <div className="flight_det_wrapper">
                                          <div className="flight_det">
                                            <div className="code_time">
                                              <span className="time text-uppercase">
                                                {/* {seg?.departing_at} */}
                                                {timeFormatter(
                                                  seg?.departing_at,
                                                  "date"
                                                )}{" "}
                                                ,{" "}
                                                <span className="airport">
                                                  {timeFormatter(
                                                    seg?.departing_at,
                                                    "time"
                                                  )}
                                                </span>
                                              </span>
                                            </div>
                                            <p className="airport">
                                              {seg?.origin.name}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flight_duration">
                                          <div className="arrow_right" />
                                          <span>{seg?.duration}</span>
                                        </div>
                                        <div className="flight_det_wrapper">
                                          <div className="flight_det">
                                            <div className="code_time">
                                              <span className="time text-uppercase">
                                                {/* {seg?.departing_at} */}
                                                {timeFormatter(
                                                  seg?.arriving_at,
                                                  "date"
                                                )}{" "}
                                                ,{" "}
                                                <span className="airport">
                                                  {timeFormatter(
                                                    seg?.arriving_at,
                                                    "time"
                                                  )}
                                                </span>
                                              </span>
                                            </div>
                                            <p className="airport">
                                              {seg?.destination?.name}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flight_refund_policy gap-5">
                                      <div className="TabPanelInner ">
                                        <h4>Refund Policy</h4>
                                        {slice?.conditions
                                          ?.refund_before_departure && (
                                          <p className="fz12">
                                            <i
                                              className={
                                                slice?.conditions
                                                  ?.refund_before_departure
                                                  ?.allowed === true
                                                  ? "fas fa-check"
                                                  : "fas fa-times"
                                              }
                                            />{" "}
                                            Refundable Ticket
                                          </p>
                                        )}
                                        {slice?.conditions
                                          ?.change_before_departure && (
                                          <p className="fz12">
                                            <i
                                              className={
                                                slice?.conditions
                                                  ?.change_before_departure
                                                  ?.allowed === true
                                                  ? "fas fa-check"
                                                  : "fas fa-times"
                                              }
                                            />{" "}
                                            Changeable Ticket
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="TabPanelInner">
                                      <h4>Baggage</h4>
                                      <div className="flight_info_taable">
                                        {/* <h3>DAC-SPD</h3> */}
                                        <p>
                                          <span>20KG /</span> person
                                        </p>
                                        <p>
                                          <span>7KG /</span> hand carry
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ))}
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                          Tab content for Profile
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No Data Found</div>
          )}
        </>
      ) : (
        <>
          {currentitems && currentitems.length >= 1 ? (
            currentitems.map((flight, index) => (
              <div className="flight_search_item_wrappper" key={index}>
                <div className="flight_search_items">
                  <div className="multi_city_flight_lists">
                    <div className="flight_multis_area_wrapper">
                      <div className="flight_search_left">
                        <div className="flight_logo">
                          <img src={flight?.owner?.logo_symbol_url} alt="img" />
                        </div>
                        <div className="flight_search_destination">
                          <p>From</p>
                          <h3>{flight?.slices[0]?.origin?.city_name}</h3>
                          <h6>{flight?.slices[0]?.origin?.name}</h6>
                        </div>
                      </div>
                      <div className="flight_search_middel">
                        <div className="flight_right_arrow">
                          <img
                            className="img-color"
                            src="assets/img/icon/right_arrow.png"
                            alt="icon"
                          />

                          <h6>Non-stop</h6>
                          <p>{formatDuration(flight?.slices[0]?.duration)} </p>
                        </div>
                        <div className="flight_search_destination">
                          <p>To</p>
                          <h3>{flight?.slices[0]?.destination?.city_name}</h3>
                          <h6>{flight?.slices[0]?.destination?.name}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flight_search_right">
                    <h2>$ {flight?.total_amount}</h2>
                    <Link
                      to="/checkout"
                      className="btn btn_theme btn_sm"
                      onClick={(e) => bookFlightHandler(e, flight)}
                    >
                      Book now
                    </Link>

                    <br />

                    {/* <p>*Discount applicable on some conditions</p> */}
                    <button
                      className="btn p-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseExample-${flight?.id}`}
                      aria-expanded="false"
                      aria-controls={`collapseExample-${flight?.id}`}
                    >
                      Show more <i className="fas fa-chevron-down" />
                    </button>
                  </div>
                </div>

                {/* slice section end here */}

                {/* SEGEMENT START HERE */}

                {flight.slices && (
                  <div>
                    <div
                      className="flight_policy_refund collapse mt-2"
                      id={`collapseExample-${flight?.id}`}
                      // key={index}
                    >
                      <Tabs defaultActiveKey="flight-detail" className="my-3">
                        <Tab eventKey="flight-detail" title={`Flight`}>
                          {flight.slices.map((slice, index) => (
                            <div>
                              {slice?.segments &&
                                slice?.segments?.map((seg, index) => (
                                  <div className="flight_show_down_wrapper justify-content-around gap-3">
                                    <div className="flight-shoe_dow_item">
                                      <div className="airline-details">
                                        <div className="img">
                                          <img
                                            src="assets/img/icon/bg.png"
                                            alt="img"
                                          />
                                        </div>
                                        <span className="airlineName fw-500">
                                          {seg?.aircraft?.name}
                                        </span>
                                        <span className="flightNumber">
                                          {seg?.aircraft?.name}
                                        </span>
                                      </div>
                                      <div className="flight_inner_show_component">
                                        <div className="flight_det_wrapper">
                                          <div className="flight_det">
                                            <div className="code_time">
                                              <span className="time text-uppercase">
                                                {/* {seg?.departing_at} */}
                                                {timeFormatter(
                                                  seg?.departing_at,
                                                  "date"
                                                )}{" "}
                                                ,{" "}
                                                <span className="airport">
                                                  {timeFormatter(
                                                    seg?.departing_at,
                                                    "time"
                                                  )}
                                                </span>
                                              </span>
                                            </div>
                                            <p className="airport">
                                              {seg?.origin.name}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flight_duration">
                                          <div className="arrow_right" />
                                          <span>{seg?.duration}</span>
                                        </div>
                                        <div className="flight_det_wrapper">
                                          <div className="flight_det">
                                            <div className="code_time">
                                              <span className="time text-uppercase">
                                                {/* {seg?.departing_at} */}
                                                {timeFormatter(
                                                  seg?.arriving_at,
                                                  "date"
                                                )}{" "}
                                                ,{" "}
                                                <span className="airport">
                                                  {timeFormatter(
                                                    seg?.arriving_at,
                                                    "time"
                                                  )}
                                                </span>
                                              </span>
                                            </div>
                                            <p className="airport">
                                              {seg?.destination?.name}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flight_refund_policy gap-5">
                                      <div className="TabPanelInner">
                                        <h4>Refund Policy</h4>
                                        {slice?.conditions
                                          ?.refund_before_departure && (
                                          <p className="fz12">
                                            <i
                                              className={
                                                slice?.conditions
                                                  ?.refund_before_departure
                                                  ?.allowed === true
                                                  ? "fas fa-check"
                                                  : "fas fa-times"
                                              }
                                            />{" "}
                                            Refundable Ticket
                                          </p>
                                        )}
                                        {slice?.conditions
                                          ?.change_before_departure && (
                                          <p className="fz12">
                                            <i
                                              className={
                                                slice?.conditions
                                                  ?.change_before_departure
                                                  ?.allowed === true
                                                  ? "fas fa-check"
                                                  : "fas fa-times"
                                              }
                                            />{" "}
                                            Changeable Ticket
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="TabPanelInner">
                                      <h4>Baggage</h4>
                                      <div className="flight_info_taable width-3">
                                        {/* <h3>DAC-SPD</h3> */}
                                        <p>
                                          <span>20KG /</span> person
                                        </p>
                                        <p>
                                          <span>7KG /</span> hand carry
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ))}
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>
              <p>No Data Found</p>
            </div>
          )}{" "}
        </>
      )}
      ;
      <div className="d-flex justify-content-center overflow-auto">
        {itemPerPage < totalItems && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemPerPage}
              totalItemsCount={totalItems}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item justify-content-center"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FlightCard;
