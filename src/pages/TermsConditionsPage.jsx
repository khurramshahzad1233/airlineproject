import React from "react";
import Layout from "../components/global/Layout";

const TermsConditionsPage = () => {
  return (
    <Layout>
      {/* Common Banner Area */}
      <section className="mt-4 mt-md-5 pt-md-5 pt-xl-0">
        <div className="container">
          <div className="d-flex flex-column justify-content-center">
            <h1 className="display-4 fw-bold">Terms & Conditions</h1>
            <h4 className="mb-0 fw-normal">
              Terms & Conditions for this platform
            </h4>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-xl-3 mb-4 mb-md-0 d-none d-lg-block">
              <div className="navtabs__menu sticky-top" style={{ top: 90 }}>
                <a className="navtab__link" href="#item1">
                  About Terms and Conditions
                </a>
                <a className="navtab__link" href="#item2">
                  {" "}
                  About Our Services{" "}
                </a>
                <a className="navtab__link" href="#item3">
                  Registration and Membership
                </a>
                <a className="navtab__link" href="#item4">
                  Applicability
                </a>
                <a className="navtab__link" href="#item5">
                  E-Tickets /Booking Code
                </a>
                <a className="navtab__link" href="#item6">
                  Fares
                </a>
              </div>
            </div>
            <div className="col terms-box">
              <div id="item1" className="terms__box">
                <h3 className="termsof__title">About Terms and Conditions</h3>
                <p className="terms__text">
                  itinertrip offers you the information about flight and
                  properties based on your personal preferences and sorting it
                  from lowest cost to highest cost with specified Flight and
                  Hotel’s name, Flight and Hotel’s detailed information, price
                  information per passenger (one person for one way flight) or
                  guests. We also offer mixed airlines within one booking in an
                  acceptable time table. We aggregate information about flights
                  and properties from a variety of resources and rank it by
                  using our proprietary algorithm. itinertrip strives to
                  compound an up-to-date collection of flight ticket which
                  belongs to the government and private-owned airlines’ company.
                  However, if you feel that our information regarding your
                  booked flight is not complete enough, it is recommended to
                  consult the relevant government agency in your country of
                  residence (Foreign Ministry, Embassy, etc.) prior to your
                  departure.
                </p>
              </div>
              <div id="item2" className="terms__box">
                <h3 className="termsof__title">
                  Restriction Use of Our Service
                </h3>
                <p className="terms__text">
                  The following terms define the restriction use of itinertrip.
                  You may use itinertrip for private and personal purposes.
                  However, you must agree not to use itinertrip for any other
                  purposes without our prior explicit written consent and while
                  using itinertrip, you agree to refrain from purposely or
                  carelessly:
                </p>
              </div>
              <div id="item3" className="terms__box">
                <h3 className="termsof__title">Registration and Membership</h3>
                <p className="terms__text">
                  Being a competitive industry travel sector requires timely
                  updates to meet their buyer requirements. By implementing our
                  flight API, gain access to the dataof broad flight suppliers.
                  Ontrack is providing you the platform to distribute through
                  multiple supplier channels and serve your customers in the
                  best possibleway.
                </p>
              </div>
              <div id="item4" className="terms__box">
                <h3 className="termsof__title">Content on itinertrip</h3>
                <p className="terms__text">
                  itinertrip offers you the information about flight and
                  properties based on your personal preferences and sorting it
                  from lowest cost to highest cost with specified Flight and
                  Hotel’s name, Flight and Hotel’s detailed information, price
                  information per passenger (one person for one way flight) or
                  guests. We also offer mixed airlines within one booking in an
                  acceptable time table. We aggregate information about flights
                  and properties from a variety of resources and rank it by
                  using our proprietary algorithm. itinertrip strives to
                  compound an up-to-date collection of flight ticket which
                  belongs to the government and private-owned airlines’ company.
                  However, if you feel that our information regarding your
                  booked flight is not complete enough, it is recommended to
                  consult the relevant government agency in your country of
                  residence (Foreign Ministry, Embassy, etc.) prior to your
                  departure.
                </p>
              </div>
              <div id="item5" className="terms__box">
                <h3 className="termsof__title">Links to Other Site</h3>
                <p className="terms__text">
                  A best flight supplier element is always comprised of factors
                  such as integrity, powerful customer support, and assistance
                  at every step. Compatibility andflawless experience are what
                  drives the efforts of our team. Using our powerful solution
                  one can meet the time gap at different locations.
                </p>
              </div>
              <div id="item6" className="terms__box">
                <h3 className="termsof__title">Privacy Policy</h3>
                <p className="terms__text">
                  Ontrack API offers your organization to get access to leading
                  GDS systems. Apart from this receive data from flight
                  aggregators, and Low-Cost Carriers(LCCs). We are working hard
                  to offer a single-point solution to our clients and delivering
                  access to global inventory at best prices making it more
                  evident.While developing solutions the only thing we kept in
                  mind was that it allows the end-to-end solutions right from
                  searching to final booking and after-salesupport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsConditionsPage;
