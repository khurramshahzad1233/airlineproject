import React from "react";

const StepComponent = ({ stepNumber, text, active }) => (
  <li>
    <button
      type="button"
      className={`btn border-0 px-0 py-3 step-link ${active && "active"}`}
    >
      {stepNumber}. {text}
    </button>
  </li>
);

export default StepComponent;
