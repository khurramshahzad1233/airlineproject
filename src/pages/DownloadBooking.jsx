import React from "react";
import { Modal } from "react-bootstrap";

const DownloadBooking = ({ show, onClose, id, bookingConfirm }) => {
  const formatDate = (data) => {
    const date = new Date(data);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

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
    const dateString = dateTimeString.slice(0, 10);
    const timeString = dateTimeString.slice(11, 16);

    if (type === "date") return dateString;

    if (type === "time") return timeString;
  };

  return (
    // <Modal centered size="lg" show={show} onHide={onClose}>
    //   <Modal.Header closeButton>
    //     <Modal.Title className="fs-3">Booking Information</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>

    <div className="px-3">
      <div className="p-3" style={{ borderBottom: "black solid 1px" }}>
        <h3 className="m-0 fw-bolder text-primary fs-2">itinertrip</h3>

        <h3 className="fs-2 fw-semibold text-uppercase mb-0">
          Booking Confirmation
        </h3>
      </div>
      {bookingConfirm?.createOrder?.data?.passengers?.map((person) => (
        <ul className="row gy-3 row-cols-1 row-cols-sm-2 row-cols-lg-3  mt-2">
          <li>
            <h6 className="mb-2 text-uppercase text-black-50">PASSENGER</h6>
            <h5>
              {person?.given_name} {person?.family_name}
            </h5>
          </li>
          <li>
            <h6 className="mb-2 text-uppercase text-black-50">STATUS</h6>
            <h5>Booked</h5>
          </li>
          <li>
            <h6 className="mb-2 text-uppercase text-black-50">
              BOOKING NUMBER (PNR)
            </h6>
            <h5>{bookingConfirm?.createOrder?.data?.booking_reference}</h5>
          </li>
          <li>
            <h6 className="mb-2 text-uppercase text-black-50 pr-2">ID</h6>
            <h5>{id}</h5>
          </li>
          <li>
            <h6 className="mb-2 text-uppercase text-black-50">BOOKING DATE</h6>
            <h5>{formatDate(bookingConfirm?.createOrder?.data?.created_at)}</h5>
          </li>
        </ul>
      ))}

      <div className="bg-light rounded-2 p-3 mt-3">
        <div className="d-flex gap-3 fs-4 fw-semibold overflow-auto w-100 text-nowrap">
          <span>
            <i className="fas fa-plane"></i>
          </span>
          <span>
            {
              bookingConfirm?.createOrder?.data?.slices[0]?.destination
                ?.city_name
            }
          </span>
          <span>-</span>
          <span>
            {bookingConfirm?.createOrder?.data?.slices[0]?.origin?.city_name}
          </span>
        </div>
        {bookingConfirm?.createOrder?.data?.slices?.map((item) => (
          <ul className="row gy-3 row-cols-1 row-cols-sm-2 row-cols-xl-4 mt-2">
            <li>
              <h6 className="mb-2 text-uppercase text-black-50">FLIGHT</h6>
              <h5 className="mb-1 fw-semibold">
                {item?.segments[0]?.aircraft?.iata_code}
              </h5>
              <h6 className="mb-1">
                Operated by {item?.segments[0]?.operating_carrier?.name}
              </h6>
              <h6 className="mb-1">{item?.segments[0]?.aircraft?.name}</h6>
              <h6>Travel time {formatDuration(item?.duration)}</h6>
            </li>
            <li>
              <h6 className="mb-2 text-uppercase text-black-50">DEPARTURE</h6>
              <h6 className="mb-1">
                <b className="fs-5 me-1">
                  {timeFormatter(item?.segments[0]?.departure_datetime, "time")}
                </b>
                <span>
                  {timeFormatter(item?.segments[0]?.departure_datetime, "date")}
                </span>
              </h6>
              <h6 className="mb-1">{item?.segments[0]?.origin?.time_zone}</h6>
              <h6 className="mb-1">
                {item?.segments[0]?.origin?.name} (
                {item?.segments[0]?.origin?.iata_code}) Terminal{" "}
                {item?.segments[0]?.departure_terminal}
              </h6>
            </li>
            <li>
              <h6 className="mb-2 text-uppercase text-black-50">ARRIVAL</h6>
              <h6 className="mb-1">
                <b className="fs-5 me-1">
                  {timeFormatter(item?.segments[0]?.arrival_datetime, "time")}
                </b>
                <span>
                  {timeFormatter(item?.segments[0]?.arrival_datetime, "date")}
                </span>
              </h6>
              <h6 className="mb-1">
                {item?.segments[0]?.destination?.time_zone}
              </h6>

              <h6 className="mb-1">
                {item?.segments[0]?.destination?.name} (
                {item?.segments[0]?.destination?.iata_code}) Terminal{" "}
                {item?.segments[0]?.arrival_terminal}
              </h6>
            </li>
            <li>
              <h6 className="mb-2 text-uppercase text-black-50">FARE</h6>
              <h5 className="mb-1">{item?.fare_brand_name}</h5>
              <h6 className="mb-1">Baggage: 2 pcs</h6>
              <h6 className="mb-1">Carry-on baggage: 1 pc, 8 kg</h6>
            </li>
          </ul>
        ))}
      </div>
      <div className="bg-light rounded-2 p-3 mt-3">
        <h4 className="fs-4 fw-semibold">Payment information</h4>
        <ul className="row gy-3 row-cols-2 row-cols-sm-3 row-cols-lg-5 mt-2">
          <li>
            <h6 className="mb-2 text-uppercase text-black-50">Fare</h6>
            <h5 className="mb-0 fw-semibold">
              {bookingConfirm?.createOrder?.data?.base_amount}{" "}
              {bookingConfirm?.createOrder?.data?.base_currency}
            </h5>
          </li>
          <li>
            <h6 className="mb-2 text-uppercase text-black-50">
              Taxes and fees
            </h6>
            <h5 className="mb-0 fw-semibold">
              {bookingConfirm?.createOrder?.data?.tax_amount}{" "}
              {bookingConfirm?.createOrder?.data?.tax_currency}
            </h5>
          </li>
          <li>
            <h6 className="mb-2 text-uppercase text-black-50">Service fee</h6>
            <h5 className="mb-0 fw-semibold">20 $</h5>
          </li>
          <li>
            <h6 className="mb-2 text-uppercase text-black-50">AP</h6>
            <h5 className="mb-0 fw-semibold">0 $</h5>
          </li>
          <li>
            <h6 className="mb-2 text-uppercase text-black-50">Total amount</h6>
            <h4 className="mb-0  fw-semibold">
              {parseInt(bookingConfirm?.createOrder?.data?.total_amount) + 20}{" "}
              {bookingConfirm?.createOrder?.data?.total_currency}
            </h4>
          </li>
        </ul>
      </div>
      <div className="mt-3">
        <div className="bg-primary bg-opacity-50 rounded-2 p-3">
          <h5 className="fw-bold">
            <i className="fas fa-exclamation-triangle"></i>
            <span className="ms-2">Attention!</span>
          </h5>
        </div>
        <ul className="list-disc small ps-4 mx-0 row row-cols-1 row-cols-lg-2 gy-2 mt-2">
          <li className="ps-0 pe-4">
            <b>Departures and Arrivals are in local time for each airport.</b>
          </li>
          <li className="ps-0 pe-4">
            <span>
              Check-in is complete 60 min. before to departure unless the
              carrier announces otherwise.
            </span>
          </li>
          <li className="ps-0 pe-4">
            <b className="me-1">
              The airline may change the flights timetable.
            </b>
            <span>
              Please be sure to check your flight departure time 24 hours before
              the flight.
            </span>
          </li>
          <li className="ps-0 pe-4">
            <span>
              The ticket is only valid when presented with a valid form of ID
              issued in the name of the person holding the ticket: national
              document or travel passport.
            </span>
          </li>
          <li className="ps-0 pe-4">
            <b className="me-1">
              The quantity of baggage items is the quantity of bags that you can
              check in as baggage.
            </b>
            <span>
              You can check the exact weight or dimensions of the baggage
              allowed on the airline’s website.
            </span>
          </li>
        </ul>
      </div>
      {/* </Modal.Body>
    </Modal> */}
    </div>
  );
};

export default DownloadBooking;
