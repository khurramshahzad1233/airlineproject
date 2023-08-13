import React from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ items }) => {
  return (
    <div className="theme_common_box_two img_hover">
      <div className="theme_two_box_img">
        <Link to>
          <img src={items.imgSrc} alt="img" />
        </Link>
        <p>
          <i className="fas fa-map-marker-alt" />
          {items.location}
        </p>
        {items.discount && (
          <div className="discount_tab">
            <span>{items.discount}%</span>
          </div>
        )}
      </div>
      <div className="theme_two_box_content">
        <h4>
          <Link to>{items.hotelName}</Link>
        </h4>
        <p>
          <span className="review_rating">{items.rating}</span>{" "}
          <span className="review_count">{items.reviewCount}</span>
        </p>
        <h3>
          {items.price} <span>Price starts from</span>
        </h3>
      </div>
    </div>
  );
};

export default HotelCard;
