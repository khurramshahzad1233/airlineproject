import React from "react";
import ButtonTooltip from "../buttons/ButtonTooltip";

const AirlineCard = ({ airline }) => {
  return (
    <div className="airline-card p-4">
      <figure className="mb-2">
        <img alt="..." src={airline.logo} />
      </figure>
      <h4 className="mb-3">{airline.name}</h4>
      {airline.buttons && (
        <div className="d-flex align-items-center gap-3">
          {airline.buttons.map((button, buttonIndex) => (
            <ButtonTooltip
              key={buttonIndex}
              className="p-0 border-0 opacity-50"
              icon={button.icon}
              title={button.title}
            />
          ))}
        </div>
      )}
      {airline.comingSoon && (
        <div>
          <span className="badge bg-primary text-white">Coming soon</span>
        </div>
      )}
    </div>
  );
};

export default AirlineCard;
