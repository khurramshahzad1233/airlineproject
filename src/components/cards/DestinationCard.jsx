import React from "react";
import { Link } from "react-router-dom";

const DestinationCard = ({ items }) => {
  return (
    <div className="tab_destinations_boxed mb-0">
      <div className="tab_destinations_img">
        <Link to>
          <img src={items.imageURL} alt="img" />
        </Link>
      </div>
      <div className="tab_destinations_conntent">
        <h3>
          <Link to>{items.title}</Link>
        </h3>
        <p>
          Price starts at <span>{items.price}</span>
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
