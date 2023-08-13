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

const BookingCancelPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.firebase.auth);
  const [show, setShow] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [bookingConfirm, setBookingConfirm] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const refValue = queryParams.get("ref");

  useEffect(() => {
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

                <h2 className="mb-3">Payment Error</h2>
                <p className="mb-2">
                  The following payment has failed. Cannot complete the payment.
                  It can be a lack of funds on the card or a transaction was
                  blocked by the bank.
                </p>

                <div className="d-flex flex-wrap gap-4">
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
                  src="/assets/img/cancelImage.jpeg"
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

export default BookingCancelPage;
