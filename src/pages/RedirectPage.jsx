import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RedirectPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const refValue = queryParams.get("ref");

  useEffect(() => {
    if (refValue) {
      axios
        .post(
          "https://itinertrip-backendfinal-production.up.railway.app/api/search/accesstoken"
        )
        .then((res) => {
          console.log("res", res);
          axios
            .post(
              `https://itinertrip-backendfinal-production.up.railway.app/api/search/getorderdetail`,
              {
                refValue: refValue,
                accesstoken: res.data.accesstoken,
              }
            )
            .then((response) => {
              console.log("res2", response);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [refValue]);

  return <div>RedirectPage: {refValue}</div>;
}
