import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BookingInformationModal from "../components/modals/BookingInformationModal";
import axios from "axios";
import LoadingModal from "../components/modals/LoadingModal";
import PaymentLoading from "../components/modals/PaymentLoading";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import DownloadBooking from "./DownloadBooking";

const BookingSuccessfulPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.firebase.auth);
  const [show, setShow] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [bookingConfirm, setBookingConfirm] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const refValue = queryParams.get("ref");

  useEffect(() => {
    let booking = localStorage.getItem("booking");
    let search = localStorage.getItem("searchParams");
    let orderConfirm = localStorage.getItem("orderConfirm");
    let bookingId = localStorage.getItem("BookingId");

    setBookingData(JSON.parse(booking));
    setSearchParams(JSON.parse(search));
    setBookingConfirm(JSON.parse(orderConfirm));
    setBookingId(bookingId);

    if (refValue) {
      setLoading(true);
      axios
        .post(
          "https://itinertrip-backendfinal-production.up.railway.app/api/search/accesstoken"
        )
        .then((res) => {
          axios
            .post(
              `https://itinertrip-backendfinal-production.up.railway.app/api/search/getorderdetail`,
              {
                refValue: refValue,
                accesstoken: res.data.accesstoken,
              }
            )
            .then((response) => {
              setPaymentData(response.data.searchFlight);
              setLoading(false);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [refValue]);

  // useEffect(() => {
  //   if (
  //     bookingData !== null &&
  //     searchParams !== null &&
  //     bookingConfirm !== null
  //   ) {
  //     localStorage.removeItem("booking");
  //     localStorage.removeItem("searchParams");
  //     localStorage.removeItem("orderConfirm");
  //   }
  // }, [bookingData, searchParams, bookingConfirm]);

  // useEffect(() => {
  //   if (
  //     bookingData === null &&
  //     searchParams === null &&
  //     bookingConfirm === null
  //   ) {
  //     navigate("/");
  //   }
  // }, [bookingData, searchParams, bookingConfirm]);

  if (loading === true) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Spinner
          animation="border"
          variant="primary"
          style={{ height: "4rem", width: "4rem" }}
        />
        ;
      </div>
    );
  }

  const printHandler = () => {
    const printElement = ReactDOMServer.renderToString(
      <DownloadBooking
        show={show}
        onClose={handleClose}
        bookingConfirm={bookingConfirm}
        id={bookingId}
      />
    );
    // const printElement = pdfJSX();

    html2pdf().from(printElement).save();
  };

  return (
    <>
      {/* <PaymentLoading show={loading} /> */}
      <BookingInformationModal
        show={show}
        onClose={handleClose}
        bookingConfirm={bookingConfirm}
        id={bookingId}
      />

      <div className="min-vh-100 d-flex flex-column justify-content-center bg-white p-3 p-md-5">
        <div className="container">
          <div className="row gy-5">
            <div className="col-12 col-lg-6">
              <div className="h-100 d-flex flex-column justify-content-center pe-xl-5">
                <div className="logo-4 mb-3">
                  <img
                    className="d-block h-100 w-100"
                    src="assets/img/logo.svg"
                    alt="logo"
                  />
                </div>

                <h2 className="mb-3">Booking Successful</h2>
                <p className="mb-2">
                  Congratulations, your booking is now confirmed! We are
                  thrilled to inform you that your reservation has been
                  successfully processed and secured. You are all set to enjoy
                  the experience you've been eagerly looking forward to.
                </p>
                <p className="mb-4">Happy travels and best wishes!</p>
                <div className="d-flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="btn btn_theme btn_md flex-fill"
                    onClick={handleShow}
                  >
                    Booking Confirmation
                  </button>
                  <button
                    type="button"
                    className="btn btn_theme btn_md flex-fill"
                    onClick={printHandler}
                  >
                    Print
                  </button>
                  <Link
                    to="/"
                    className="btn btn-outline-primary btn_md flex-fill"
                  >
                    Back Home
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 order-first order-lg-last">
              <div className="ratio ratio-4x3 bg-light rounded-3 shadow">
                <img
                  className="d-block h-100 w-100 object-cover rounded-3"
                  src="/assets/img/early-booking.jpg"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingSuccessfulPage;
