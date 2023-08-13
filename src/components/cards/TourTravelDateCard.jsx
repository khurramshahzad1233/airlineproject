import React from "react";

const TourTravelDateCard = () => {
  return (
    <div className="tour_details_right_boxed">
      <div className="tour_details_right_box_heading">
        <h3>Travel date</h3>
      </div>
      <div className="edit_date_form">
        <div className="form-group">
          <label htmlFor="dates">Edit Date</label>
          <input
            type="date"
            defaultValue="2022-05-05"
            className="form-control"
            id="dates"
          />
        </div>
      </div>
      <div className="tour_package_details_bar_list">
        <h5>Tourist</h5>
        <div className="select_person_item">
          <div className="select_person_left">
            <h6>Adult</h6>
            <p>12y+</p>
          </div>
          <div className="select_person_right">
            <h6>01</h6>
          </div>
        </div>
        <div className="select_person_item">
          <div className="select_person_left">
            <h6>Children</h6>
            <p>2 - 12 years</p>
          </div>
          <div className="select_person_right">
            <h6>01</h6>
          </div>
        </div>
        <div className="select_person_item">
          <div className="select_person_left">
            <h6>Infant</h6>
            <p>Below 2 years</p>
          </div>
          <div className="select_person_right">
            <h6>01</h6>
          </div>
        </div>
      </div>
      <div className="edit_person">
        <p>Edit person</p>
      </div>
    </div>
  );
};

export default TourTravelDateCard;
