import React from "react";
import { Slider } from "@mui/material";
import { Flightstate } from "../../context/Flightprovider";

const PriceSlider = () => {
  const { price, setPrice } = Flightstate();
  // console.log(price)

  const priceHandler = (e, value) => {
    setPrice(value);
  };
  return (
    <div className="px-2">
      <Slider
        value={price}
        onChange={priceHandler}
        valueLabelDisplay="auto"
        min={1}
        max={15000}
      />
    </div>
  );
};

export default PriceSlider;
