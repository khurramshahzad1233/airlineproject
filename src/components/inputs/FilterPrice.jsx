import React, { useEffect, useState, useCallback, useMemo } from "react";
import PriceSlider from "./PriceSlider";
import { Flightstate } from "../../context/Flightprovider";
import LoadingModal from "../modals/LoadingModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NumberStopsOptions = [
  {
    label: "1 stop",
    id: "1",
  },
  {
    label: "2 stop",
    id: "2",
  },
  {
    label: "Non-stop",
    id: "0",
  },
];

const flightClass = [
  {
    label: "Economy",
    id: "economy",
  },
  {
    label: "Business",
    id: "business",
  },
  {
    label: "First",
    id: "frist",
  },
];

const AirlinesCheckboxOptions = [
  {
    label: "Duffel Airways",
    id: "3251",
  },
  {
    label: "Fly Amirates",
    id: "65242",
  },
  {
    label: "Novo Air",
    id: "02453",
  },
  {
    label: "Air Asia",
    id: "05554",
  },
  {
    label: "Singapore Airlines",
    id: "5",
  },
];

const RefundableCheckboxOptions = [
  {
    label: "Yes",
    id: "true",
  },
  {
    label: "No",
    id: "false",
  },
];

const FilterPrice = () => {
  const navigate=useNavigate()
  const {
    price,
    flightOffer,
    setFlightOffer,
    querrydata,
    setQuerrydata,
    origin,
    destination,
    departureDate,
    returnDate,
    passenger,
    loading,
    setLoading,
    show,
    setShow,
    selectDate,
    setSelectDate,
    checked,
    setChecked,
    stopcheck,
    setStopcheck,
    airlinecheck,
    setAirlinecheck,
    refund,
    setRefund,
  } = Flightstate();

  const [initial,setInitial]=useState(false);

  const handlerefund=(e)=>{
    setRefund((prev)=>(prev===e.target.value?"":e.target.value))
  };
  const handleairline=(e)=>{
    setAirlinecheck((pre)=>(pre===e.target.value?"":e.target.value))
  }
  const handlestop=(e)=>{
    setStopcheck((prev)=>(prev===e.target.value?"":e.target.value))
  }
  const handleclass=(e)=>{
    setChecked((prev)=>(prev===e.target.value?"":e.target.value))
  }
  // main query handler function
  const sliderHandlerSearch =  () => {
    setRefund("")
    setAirlinecheck("")
    let slideroffer =
      (flightOffer.offers) &&
      flightOffer.offers.filter(
        (off) => off.total_amount >= price[0] && off.total_amount <= price[1]
      );

    setQuerrydata(slideroffer);
  };

  // filter function

  const emptyfunction = useCallback(async () => {
    setLoading(true);
    setShow(true);
    setRefund("")
    setAirlinecheck("")
    setInitial(true)
    const passengerData = [];
    if (passenger.adult > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "adult" });
      }
    }
    if (passenger.child > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "child" });
      }
    }
    if (passenger.infant > 0) {
      for (let i = 0; i < passenger.adult; i++) {
        passengerData.push({ type: "infant_without_seat" });
      }
    }

    let departDate = selectDate ? selectDate : departureDate;
    const searchParams = {
      data: {
        slices: [
          {
            destination,
            origin,
            departure_date: departDate,
          },
        ],
        passengers: passengerData,
        cabin_class: checked?checked:"",
        max_connections: stopcheck?stopcheck:"",
        live_mode:true,
      },
    };
    try {
      const response = await axios.post(
        "https://itnertripbackend-production.up.railway.app/api/search/flight",
        searchParams,
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );

      // const data = response.data.data.offers;
      const data=response.data.searchFlight;
      setFlightOffer(data);
      navigate("/flight-search");
      setLoading(false);
      setShow(false);
    } catch (error) {
      setShow(false);
      setLoading(false);
      console.error(error);
    }
  }, [
    passenger.adult,
    passenger.infant,
    passenger.child,
    setFlightOffer,
    checked,
    stopcheck,
    destination,
    origin,
    departureDate,
  ]);


  // return trip filter function
  const returnemptyfunction = useCallback(
    async (e) => {
      setShow(true);
      setLoading(true);
      setRefund("")
      setAirlinecheck("")
      setInitial(true);
      const passengerData = [];
      if (passenger.adult > 0) {
        for (let i = 0; i < passenger.adult; i++) {
          passengerData.push({ type: "adult" });
        }
      }
      if (passenger.child > 0) {
        for (let i = 0; i < passenger.adult; i++) {
          passengerData.push({ type: "child" });
        }
      }
      if (passenger.infant > 0) {
        for (let i = 0; i < passenger.adult; i++) {
          passengerData.push({ type: "infant_without_seat" });
        }
      }

      let departDate = selectDate ? selectDate : departureDate;
      const searchParams = {
        data: {
          slices: [
            {
              destination,
              origin,
              departure_date: departDate,
            },
            {
              destination: origin,
              origin: destination,
              departure_date: returnDate,
            },
          ],
          passengers: passengerData,
          cabin_class: checked?checked:"",
          max_connections: stopcheck?stopcheck:"",
          live_mode: true,
        },
      };
      try {
        const response = await axios.post(
          "https://itnertripbackend-production.up.railway.app/api/search/flight",
          searchParams,
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
        const data = response.data.searchFlight;
        setFlightOffer(data);
        navigate("/flight-search");
        setShow(false);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setShow(false);
      }
    },
    [
      // category,
      departureDate,
      destination,
      origin,
      passenger.adult,
      passenger.child,
      passenger.infant,
      returnDate,
      setFlightOffer,
      checked,
      stopcheck,
    ]
  );

  const querryairlinefilter1 = useCallback(() => {
    let slideroffer =
      (flightOffer.offers) &&
      flightOffer.offers.filter(
        (off) => off.total_amount >= price[0] && off.total_amount <= price[1]
      );
      let refundoffer=[];
      if (refund === "true") {
        let refundoffertrue =
          slideroffer &&
          slideroffer.filter(
            (fund) => fund.conditions.change_before_departure?.allowed === true
          );
          refundoffer=refundoffertrue;
        
      }
      if (refund === "false") {
        let refundofferfalse =
          slideroffer &&
          slideroffer.filter(
            (fund) => fund.conditions.change_before_departure?.allowed === false
          );
        refundoffer=refundofferfalse;
      }

      if(refund===""){
        refundoffer=slideroffer;
      }

  
    let airlinename =
      refundoffer &&
      refundoffer.filter((airline) =>
        airlinecheck.includes(airline.owner.name)
      );

    setQuerrydata(airlinename);
  }, [airlinecheck, flightOffer, setQuerrydata,price,refund]);

  const setrefundfunction = useCallback(() => {
    let result =
      (flightOffer.offers) &&
      flightOffer.offers.filter(
        (off) => off.total_amount >= price[0] && off.total_amount <= price[1]
      );

      let airlinename=[]

      if(airlinecheck){
        let airline1 =
      result &&
      result.filter((airline) =>
        airlinecheck.includes(airline.owner.name)
      );
      airlinename=airline1
      };
      if(airlinecheck===""){
        airlinename=result
      }
    

      
  
    if (refund === "true") {
      let refundoffer =
        airlinename &&
        airlinename.filter(
          (fund) => fund.conditions.change_before_departure?.allowed === true
        );
      setQuerrydata(refundoffer);
    
    }
    if (refund === "false") {
      let refundoffer1 =
        airlinename &&
        airlinename.filter(
          (fund) => fund.conditions.change_before_departure?.allowed === false
        );
      setQuerrydata(refundoffer1);
    
    }
  }, [flightOffer, refund, setQuerrydata,airlinecheck,price]);


  useEffect(() => {
    if (checked) {
      if (returnDate || stopcheck) return;

      emptyfunction();
    }
    if (stopcheck) {
      if (checked || returnDate) return;

      emptyfunction();
    }
  }, [checked,stopcheck, returnDate]);

  useEffect(() => {
    if (checked) {
      if (!returnDate) return;
      if (stopcheck) return;
      returnemptyfunction();
    }

    if (stopcheck) {
      if (!returnDate) return;
      if (checked) return;
      returnemptyfunction();
    }
  }, [
    checked,
    stopcheck,
    returnDate,
  ]);

  useEffect(() => {
    if (stopcheck) {
      if (checked) {
        if (returnDate) return;
        emptyfunction();
      }
    }
    
    if (checked) {
      if (stopcheck) {
        if (returnDate) return;
        emptyfunction();
      }
    }
  }, [checked, stopcheck, returnDate]);

  
  useEffect(() => {
    if (checked) {
      if (!stopcheck) return;
      if (!returnDate) return;
      returnemptyfunction();
    }

    if (stopcheck) {
      if (!checked) return;
      if (!returnDate) return;
      returnemptyfunction();
    }
  }, [checked, stopcheck, returnDate]);

  useEffect(() => {
    if (airlinecheck) {
      querryairlinefilter1();
    };
    if(airlinecheck===""){
      querryairlinefilter1()
    }
  }, [airlinecheck]);

 
  useEffect(() => {
    if (refund) {
      setrefundfunction();
    };
    if(refund===""){
      setrefundfunction()
    }
  }, [refund]);

  useEffect(()=>{
    if(initial===true && stopcheck===""){
      if(returnDate) return;
      emptyfunction()
    }
    if(initial===true && checked===""){
      if(returnDate) return;
      emptyfunction()
    }
  },[stopcheck,checked,initial]);

  useEffect(()=>{
    if(initial===true && stopcheck===""){
      if(!returnDate) return;
      returnemptyfunction()
    };
    if(initial===true && checked===""){
      if(!returnDate) return;
      returnemptyfunction()
    }
  },[checked,returnDate,stopcheck,initial])

  
  
  return (
    <>
      <LoadingModal show={show} setShow={setShow} />
      <div className="left_side_search_area">
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Filter by price</h5>
          </div>
          <div className="filter-price py-2">
            <PriceSlider />
          </div>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={sliderHandlerSearch}
          >
            Apply
          </button>
        </div>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Number of stops</h5>
          </div>
          <div className="tour_search_type">
            {NumberStopsOptions.map((option) => (
              <div className="form-check" key={option.label}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={option.id}
                  checked={stopcheck === option.id}
                  onChange={(e) => handlestop(e)}
                  id={option.id}
                />
                <label className="form-check-label" htmlFor={option.id}>
                  <span className="area_flex_one">
                    <span>{option.label}</span>
                    {/* <span>{option.value}</span> */}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Flight class</h5>
          </div>
          <div className="tour_search_type">
            {flightClass.map((item) => (
              <div className="form-check" key={item.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={item.label}
                  checked={checked === item.label}
                  onChange={(e) => handleclass(e)}
                  id={item.id}
                />
                <label className="form-check-label" htmlFor={item.id}>
                  <span className="area_flex_one">
                    <span>{item.label}</span>
                    {/* <span>{item.value}</span> */}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Airlines</h5>
          </div>
          <div className="tour_search_type">
            {AirlinesCheckboxOptions.map((item) => (
              <div className="form-check" key={item.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={item.label}
                  checked={airlinecheck === item.label}
                  onChange={(e)=>handleairline(e)}
                  id={item.id}
                />
                <label className="form-check-label" htmlFor={item.id}>
                  <span className="area_flex_one">
                    <span>{item.label}</span>
                    {/* <span>{option.value}</span> */}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Refundable</h5>
          </div>
          <div className="tour_search_type">
            {RefundableCheckboxOptions.map((option) => (
              <div className="form-check" key={option.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={option.id}
                  // onChange={(e) => setRefund(e.target.value)}
                  onChange={(e)=>handlerefund(e)}
                  checked={refund === option.id}
                  id={option.id}
                />
                <label className="form-check-label" htmlFor={option.id}>
                  <span className="area_flex_one">
                    <span>{option.label}</span>
                    {/* <span>{option.value}</span> */}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPrice;
