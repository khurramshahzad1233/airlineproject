import React from "react";

const CtaSection = () => {
  return (
    <section id="cta_area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="cta_left">
              <div className="cta_icon">
                <img
                  className="img-color"
                  src="assets/img/common/email.png"
                  alt="icon"
                />
              </div>
              <div className="cta_content">
                <h4>Get the latest news and offers</h4>
                <h2>Subscribe to our newsletter</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="cat_form">
              <form id="cta_form_wrappper">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your mail address"
                    required
                  />
                  <button className="btn btn_theme btn_md" type="submit">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
