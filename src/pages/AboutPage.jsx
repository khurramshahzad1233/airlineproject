import React from "react";
import Layout from "../components/global/Layout";
import CtaSection from "../components/sections/CtaSection";
import CommonBannerSection from "../components/sections/CommonBannerSection";

const AboutPage = () => {
  return (
    <Layout>
      {/* Common Banner Area */}
      <CommonBannerSection title="About us" pageName="About" />
      {/* About Us */}
      <section id="about_us_top" className="py-5">
        <div className="container">
          <div className="about_us_left">
            <h5>About us</h5>
            <h2>Build A New and Easier Way of Traveling</h2>
            <p>
              itinertrip established in 2011 under itinertrip Limited. Our
              journey starts in 2014 with the first flight ticket sold out from
              our one-stop online booking platform, indicating that we had
              officially joined into the world of travel industry. Eventually,
              we expanded our service range from domestic flight to
              international flight and embarked on accommodation booking to
              lighten traveler's needs perfectly. As a third party, together
              with various airlines and accomodation partners, we successfully
              bring more than 3 million people into their ideal flights until
              today and the number continues to grow. Our aim is to let people
              enjoy their trips to the optimum extent right from the scratch.
            </p>
            <p>
              We are highly dedicated in giving the superb booking experience by
              providing flexible payment in local currency, local languages,
              effortless manage booking feature, easy booking steps, best fare
              calendar, and 24/7 customer support. More than 100.000 people has
              installed our app from Google Play and App Store, encouraging more
              people to travel the world only from their fingertips. Achieving
              amazing milestones will not stop us from upgrading our service
              better. Because, our journey is still a long way ahead. Soon, we
              will present greater service and fulfill traveling's demands in
              the global market range.
            </p>
            <p>
              Our Pioneers in the Southeast Asia Market including Indonesia,
              Malaysia, Philippines, Thailand, Taiwan, Vietnam, Australia,
              Singapore, China, Hong Kong, Brunei Darussalam, Cambodia, Laos,
              Myanmar, Japan, Macau, South Korea, and India with expansion plans
              aiming to the worldwide vibrant market.
            </p>
          </div>
        </div>
      </section>
      {/* About Banner */}
      <section id="about_offer_banner" className="section_padding_bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="about_offer_banner">
                <img
                  src="https://andit.co/projects/html/and-tour/demo/assets/img/common/small_banner.png"
                  alt="img"
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="about_offer_banner">
                <img
                  src="https://andit.co/projects/html/and-tour/demo/assets/img/common/big_banner.png"
                  alt="img"
                />
                {/* <div className="about_offer_text">
                  <h3>
                    Enjoy <span>20%</span> discount
                  </h3>
                  <h2>Thailand couple tour</h2>
                  <a href="tour-search.html">Find tours</a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Service Area */}
      <section id="about_service_offer" className="section_padding_bottom">
        <div className="container">
          <h2 className="mb-5">Why itinertrip?</h2>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="about_service_boxed h-100">
                <img
                  src="https://andit.co/projects/html/and-tour/demo/assets/img/icon/world.png"
                  alt="img"
                />
                <h5>
                  <a href="#!">Simplify Your Booking Experience</a>
                </h5>
                <p>
                  Feel the flexibility and simplicity throughout your booking
                  process
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="about_service_boxed h-100">
                <img
                  src="https://andit.co/projects/html/and-tour/demo/assets/img/icon/walte.png"
                  alt="img"
                />
                <h5>
                  <a href="#!">Online Booking Expert</a>
                </h5>
                <p>
                  Together with our credible partners, fulfilling countless
                  traveler's needs since 2011
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="about_service_boxed h-100">
                <img
                  src="https://andit.co/projects/html/and-tour/demo/assets/img/icon/star.png"
                  alt="img"
                />
                <h5>
                  <a href="#!">Wide Selections of Travel Product</a>
                </h5>
                <p>
                  Enjoy your memorable moments with millions of favorable
                  flights and accommodations
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="about_service_boxed h-100">
                <img
                  src="https://andit.co/projects/html/and-tour/demo/assets/img/icon/support.png"
                  alt="img"
                />
                <h5>
                  <a href="#!">World's Local Booking Excitement</a>
                </h5>
                <p>
                  Stress-free booking experience with local payment, currency,
                  and language
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cta Area */}
      <CtaSection />
    </Layout>
  );
};

export default AboutPage;
