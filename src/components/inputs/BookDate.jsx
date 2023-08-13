import React,{useEffect, useState,useCallback} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Flightstate } from "../../context/Flightprovider";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const BookDate = () => {
  const navigate=useNavigate();
  const {
    setLoading,
    departureDate,
    show,
    setShow,
    passenger,
    origin,
    destination,
    category,
    setQuerrydata,
    returnDate,
    selectDate,
    setSelectDate,
    checked,
    setFlightOffer,
    stopcheck,
    setAirlinecheck,
    setRefund,

  
    
  } = Flightstate();
  const [daterange,setDaterange]=useState([]);

  const getdaterange=()=>{
    let result=[];
    let currentdeparturedate=new Date(departureDate);
    for (let i=0; i<8; i++){
      currentdeparturedate.setDate(currentdeparturedate.getDate()+1);
      result.push(currentdeparturedate.toISOString().slice(0,10))
    };
    setDaterange(result)
  }

  const datequerryfunction=useCallback(async(e)=>{
    setLoading(true);

      setShow(true);
      setAirlinecheck("");
      setRefund("");
      const passengerData = [];
      if (passenger.adult > 0) {
        for (let i = 0; i < passenger.adult; i++) {
          passengerData.push({ type: "adult" });
        }
      }
      if (passenger.child > 0) {
        for (let i = 0; i < passenger.child; i++) {
          passengerData.push({ type: "child" });
        }
      }
      if (passenger.infant > 0) {
        for (let i = 0; i < passenger.infant; i++) {
          passengerData.push({ type: "infant_without_seat" });
        }
      }
      
      let cabinclass=checked?checked:"";
      let flightstop=stopcheck?stopcheck:"";

      const searchParams = {
        data: {
          slices: [
            {
              destination,
              origin,
              departure_date: selectDate,
            },
          ],
          passengers: passengerData,
          live_mode: true,
          cabin_class: cabinclass,
          max_connections:flightstop,
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

        
        const data=response.data.searchFlight;
        setFlightOffer(data);
        setShow(false);
        setLoading(false);
        navigate("/flight-search");
      } catch (error) {
        setShow(false);
        setLoading(false);
        console.error(error);
      }
    },
    [
      passenger.adult,
      passenger.infant,
      passenger.child,
      setFlightOffer,
      destination,
      origin,
      selectDate,
      
    ]);

    const returndatequerryfunction = useCallback(
      async (e) => {
        
  
        setShow(true);
        setLoading(true);
        setAirlinecheck("");
        setRefund("");
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
  
        let cabinclass=checked?checked:"";
        let flightstop=stopcheck?stopcheck:"";
        const searchParams = {
          data: {
            slices: [
              {
                destination,
                origin,
                departure_date: selectDate,
              },
              {
                destination: origin,
                origin: destination,
                departure_date: returnDate,
              },
            ],
            passengers: passengerData,
            cabin_class: cabinclass,
            max_connections:flightstop,
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
          setLoading(false);
          setShow(false);
          navigate("/flight-search");
        } catch (error) {
          console.error(error);
          setLoading(false);
          setShow(false)
        }
      },
      [
        selectDate,
        destination,
        origin,
        passenger.adult,
        passenger.child,
        passenger.infant,
        returnDate,
        setFlightOffer,
      ]
    );
 
  useEffect(()=>{
    getdaterange()
  },[])
  
  useEffect(()=>{
    if(selectDate){
      if(returnDate) return;
      datequerryfunction()
    }
  },[selectDate,datequerryfunction,returnDate]);

  useEffect(()=>{
    if(selectDate){
      if(!returnDate) return;
      returndatequerryfunction()
    }
  },[selectDate,returnDate,returndatequerryfunction])


  const renderSlides = () => {
    return daterange.map((slide, index) => (
      <SwiperSlide key={`flight-book-${index}`}>
        <button
          type="button"
          onClick={() => setSelectDate(slide)}
          className={`w-100 btn btn-book text-center p-3 ${
            selectDate === slide && "active"
          } `}
        >
          <small className="d-block">{slide}</small>
          {/* <span className="d-block fs-6 fw-semibold">{slide.price}</span> */}
        </button>
      </SwiperSlide>
    ));
  };

  return (
    <Swiper
      className="swiper-flight-book"
      navigation
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1300: {
          slidesPerView: 5,
        },
      }}
    >
      <div className="swiper-wrapper">{renderSlides()}</div>
    </Swiper>
  );
};

export default BookDate;
