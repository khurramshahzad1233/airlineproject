import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Flightstate } from "../../context/Flightprovider";

export default function LoadingModal({ show, setShow }) {
  const { fullOrigin, fullDestination, departureDate, passenger } =
    Flightstate();
  return (
    <Modal centered show={show}>
      <Modal.Body>
        <div className="text-center p-3">
          <div className="mb-3 icon-2 mx-auto">
            <img
              className="d-block h-100 w-100"
              src="/assets/img/icon/loading.jpg"
              alt="..."
            />
          </div>
          <div className="d-flex align-items-md-center justify-content-center gap-1 mb-2 me-auto">
            {/* <div>
              <i class="fas fa-plane-departure fs-5"></i>
            </div> */}
            <div>
              <div className="d-flex flex-column justify-content-center align-items-center gap-1 h6 mb-2 fw-semibold">
                <span>{fullOrigin?.label}</span>
                <span>
                  <i class="d-block fas fa-rotate-90 fa-arrow-right fs-6"></i>
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
          {/* <h5 className="mb-2 fw-semibold">Starting to Process Your Request</h5>
          <p className="mb-2 small text-black-50">
            <small>Please wait while the little evles take you three</small>
          </p> */}
          <Spinner animation="grow" variant="primary" />
        </div>
      </Modal.Body>
    </Modal>
  );
}
