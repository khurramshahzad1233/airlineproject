import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookingInformationModal from "../modals/BookingInformationModal";

const MyBookingsTable = ({ data }) => {
  const bookingsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);

  const bookings = [
    {
      slNo: "01.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
    {
      slNo: "02.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
    {
      slNo: "03.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
    {
      slNo: "04.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
    {
      slNo: "05.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Canceled",
    },
    {
      slNo: "06.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
    {
      slNo: "07.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
    {
      slNo: "08.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
    {
      slNo: "09.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
    {
      slNo: "10.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
    {
      slNo: "11.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Canceled",
    },
    {
      slNo: "12.",
      bookingId: "#JK589V80",
      bookingType: "Hotel",
      bookingAmount: "$754.00",
      status: "Completed",
    },
  ];

  // Calculate the index range for the current page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = data?.slice(indexOfFirstBooking, indexOfLastBooking);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log("currentBookings", currentBookings);

  return (
    <>
      <div className="dashboard_common_table">
        <h3>My bookings</h3>
        <div className="table-responsive-lg table_common_area">
          <table className="table">
            <thead>
              <tr>
                <th>Sl no.</th>
                <th>Booking ID</th>
                <th>Booking type</th>
                <th>Booking amount</th>
                {/* <th>Status</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings?.map((booking, index) => (
                <>
                  {" "}
                  <BookingInformationModal
                    show={show}
                    onClose={() => setShow(false)}
                    bookingConfirm={booking}
                    id={booking?.bookingId}
                  />
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{booking?.bookingId}</td>
                    <td>{booking?.createOrder?.data?.type}</td>
                    <td>
                      {booking?.createOrder?.data?.total_amount}{" "}
                      {booking?.createOrder?.data?.total_currency}
                    </td>
                    {/* <td
                    className={
                      booking?.data?.payment_status?.awaiting_payment === false
                        ? "cancele"
                        : "complete"
                    }
                  >
                    {booking?.data?.payment_status?.awaiting_payment === false
                      ? "pending"
                      : "complete"}
                  </td> */}
                    <td>
                      <i className="fas fa-eye" onClick={() => setShow(true)} />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination_area">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <Link
              className="page-link"
              to
              onClick={() => paginate(currentPage - 1)}
            >
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </Link>
          </li>
          {Array.from(
            { length: Math.ceil(bookings.length / bookingsPerPage) },
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <Link
                  className="page-link"
                  to
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Link>
              </li>
            )
          )}
          <li
            className={`page-item ${
              currentPage === Math.ceil(bookings.length / bookingsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <Link
              className="page-link"
              to
              onClick={() => paginate(currentPage + 1)}
            >
              <span aria-hidden="true">»</span>
              <span className="sr-only">Next</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MyBookingsTable;
