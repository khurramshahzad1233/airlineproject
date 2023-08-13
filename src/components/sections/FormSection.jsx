import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Flightstate } from "../../context/Flightprovider";
import CustomAsyncSelect from "../inputs/CustomAsyncSelect";
import LoadingModal from "../modals/LoadingModal";
import { toast } from "react-toastify";

const categories = [
  { title: "Economy", value: "economy" },
  { title: "Economy Plus", value: "premium_economy" },
  { title: "Business class", value: "business" },
  { title: "First class", value: "first" },
];
const FormSection = ({ classBox, marginTop }) => {
  const {
    setFlightOffer,
    origin,
    setOrigin,
    destination,
    setDestination,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    passenger,
    setPassenger,
    fullOrigin,
    setFullOrigin,
    fullDestination,
    setFullDestination,
    setLoading,
    category,
    setCategory,
    show,
    setShow,
  } = Flightstate();

  const navigate = useNavigate();

  const searchFlightHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      setShow(true);
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

      if (!destination || !origin || !departureDate || !passenger) {
        setLoading(false);
        setShow(false);
        toast.error("Please enter all fields");
        return;
      }

      const searchParams = {
        data: {
          slices: [
            {
              destination,
              origin,
              departure_date: departureDate,
            },
          ],
          passengers: passengerData,
          live_mode: true,
        },
      };
      try {
        const response = await axios.post(
          "https://itnertripbackend-production.up.railway.app/api/search/flight",
          searchParams,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.searchFlight;
        setFlightOffer(data);
        setShow(false);
        setLoading(false);
        navigate("/flight-search");
      } catch (error) {
        setShow(false);
        setLoading(false);
        toast.error("network error");
      }
    },
    [
      passenger.adult,
      passenger.infant,
      passenger.child,
      setFlightOffer,
      destination,
      origin,
      departureDate,
    ]
  );

  // Return Flight Function

  const returnFlightSearchHandler = useCallback(
    async (e) => {
      e.preventDefault();

      setShow(true);
      setLoading(true);
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

      if (
        !destination ||
        !origin ||
        !departureDate ||
        !passenger ||
        !returnDate
      ) {
        setLoading(false);
        setShow(false);
        toast.error("Please enter all fields");
      }

      const searchParams = {
        data: {
          slices: [
            {
              destination,
              origin,
              departure_date: departureDate,
            },
            {
              destination: origin,
              origin: destination,
              departure_date: returnDate,
            },
          ],
          passengers: passengerData,
          live_mode: true,
        },
      };
      try {
        const response = await axios.post(
          "https://itnertripbackend-production.up.railway.app/api/search/flight",
          searchParams,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.searchFlight;
        setFlightOffer(data);
        setShow(false);
        setLoading(false);
        navigate("/flight-search");
      } catch (error) {
        setLoading(false);
        setShow(false);
        toast.error("network error");
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
    ]
  );

  const getLocations = async (query) => {
    const response = await axios.get(
      `https://itnertripbackend-production.up.railway.app/api/search/flightcity?query=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.city;
  };

  const filterData = (inputValue, formattedData) => {
    return formattedData;
  };

  const loadOptions = async (inputValue, callback) => {
    let data = await getLocations(inputValue);

    let formattedData = data.map((v) => ({
      value: v?.iata_city_code,
      label: v?.name,
    }));
    callback(filterData(inputValue, formattedData));
  };

  const getDay = (date) => {
    // Convert dateString to a JavaScript Date object
    const dateObject = new Date(date);

    // Get the day from the dateObject (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const day = dateObject.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return daysOfWeek[day];
  };

  // const memosearchflighthandler = useMemo(
  //   () => searchFlightHandler,
  //   [searchFlightHandler]
  // );
  // const memoreturnflighthandler = useMemo(
  //   () => returnFlightSearchHandler,
  //   [returnFlightSearchHandler]
  // );

  // useEffect(() => {
  //   memosearchflighthandler();
  //   memoreturnflighthandler();
  // }, [memosearchflighthandler, memoreturnflighthandler]);

  return (
    <>
      <LoadingModal show={show} setShow={setShow} />

      <section id="theme_search_form" className={`${marginTop && "mt-0"}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className={`theme_search_form_area ${classBox}`}>
                <div className="theme_search_form_tabbtn">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="flights-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#flights"
                        type="button"
                        role="tab"
                        aria-controls="flights"
                        aria-selected="true"
                      >
                        <i className="fas fa-plane-departure" />
                        Flights
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="hotels-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#hotels"
                        type="button"
                        role="tab"
                        aria-controls="hotels"
                        aria-selected="false"
                      >
                        <i className="fas fa-hotel" />
                        Hotels
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="tours-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tours"
                        type="button"
                        role="tab"
                        aria-controls="tours"
                        aria-selected="false"
                      >
                        <i className="fas fa-globe" />
                        Tours
                      </button>
                    </li>
                  </ul>
                </div>
                <fieldset className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="flights"
                    role="tabpanel"
                    aria-labelledby="flights-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="flight_categories_search">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="oneway-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#oneway_flight"
                                type="button"
                                role="tab"
                                aria-controls="oneway_flight"
                                aria-selected="true"
                              >
                                One Way
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="roundtrip-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#roundtrip"
                                type="button"
                                role="tab"
                                aria-controls="roundtrip"
                                aria-selected="false"
                              >
                                Roundtrip
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="multi_city-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#multi_city"
                                type="button"
                                role="tab"
                                aria-controls="multi_city"
                                aria-selected="false"
                              >
                                Multi city
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content" id="myTabContent1">
                      <div
                        className="tab-pane fade show active"
                        id="oneway_flight"
                        role="tabpanel"
                        aria-labelledby="oneway-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form action="#!">
                                <div className="row">
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>From</p>
                                      <CustomAsyncSelect
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        defaultOptions
                                        onChange={(e) => {
                                          setOrigin(e.value);
                                          setFullOrigin(e);
                                        }}
                                        placeholder="Origin"
                                        defaultValue={
                                          fullOrigin
                                            ? {
                                                label: fullOrigin?.label,
                                                value: fullOrigin?.value,
                                              }
                                            : null
                                        }
                                      />
                                      <span>
                                        {fullOrigin?.value} -{" "}
                                        {fullOrigin?.label}
                                        {/* JFK - John F. Kennedy International... */}
                                      </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>To</p>
                                      <CustomAsyncSelect
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        defaultOptions
                                        onChange={(e) => {
                                          setDestination(e.value);
                                          setFullDestination(e);
                                        }}
                                        placeholder="Destination"
                                        defaultValue={
                                          fullDestination
                                            ? {
                                                label: fullDestination?.label,
                                                value: fullDestination?.value,
                                              }
                                            : null
                                        }
                                      />
                                      <span>
                                        {fullDestination?.value} -{" "}
                                        {fullDestination?.label}
                                      </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                        <i className="fas fa-exchange-alt" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          <p>Journey date</p>
                                          <input
                                            type="date"
                                            onChange={(e) =>
                                              setDepartureDate(e.target.value)
                                            }
                                          />
                                          <span>
                                            {departureDate
                                              ? getDay(departureDate)
                                              : "-"}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      <p>Passenger, Class </p>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          style={{
                                            color:
                                              passenger.infant +
                                                passenger.adult +
                                                passenger.child ===
                                              0
                                                ? "#818090"
                                                : "black",
                                          }}
                                        >
                                          {passenger.infant +
                                            passenger.adult +
                                            passenger.child}{" "}
                                          Passengers
                                        </button>
                                        <span>
                                          {passenger.adult !== 0 &&
                                            `${passenger.adult} adult `}{" "}
                                          {passenger.child !== 0 &&
                                            `${passenger.child} child `}{" "}
                                          {passenger.infant !== 0 &&
                                            `${passenger.infant} infant `}
                                        </span>
                                        {passenger.infant +
                                          passenger.adult +
                                          passenger.child >=
                                        9 ? (
                                          <span className="text-danger">
                                            Maximum 9 passengers allowed. (6
                                            Adults)
                                          </span>
                                        ) : null}
                                        <div
                                          className="dropdown-menu dropdown_passenger_info dropdown-menu-end"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    {/* <span className="count pcount">
                                                      {passenger.adult}
                                                    </span> */}
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add"
                                                      disabled={
                                                        passenger.infant +
                                                          passenger.adult +
                                                          passenger.child >=
                                                          9 ||
                                                        passenger.adult >= 6
                                                          ? true
                                                          : false
                                                      }
                                                      onClick={() => {
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            adult:
                                                              prev.adult + 1,
                                                          })
                                                        );
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <span className="count pcount">
                                                      {passenger.adult}
                                                    </span>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                      onClick={() => {
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            adult:
                                                              prev.adult - 1,
                                                          })
                                                        );
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    {/* <span className="count ccount">
                                                      {passenger.child}
                                                    </span> */}
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Children
                                                      </p>
                                                      <span>
                                                        2 - Less than 12 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-c"
                                                      disabled={
                                                        passenger.infant +
                                                          passenger.adult +
                                                          passenger.child >=
                                                        9
                                                          ? true
                                                          : false
                                                      }
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            child:
                                                              prev.child + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    {passenger.child}
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-c"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            child:
                                                              prev.child - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    {/* <span className="count incount">
                                                      {passenger.infant}
                                                    </span> */}
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Infant
                                                      </p>
                                                      <span>
                                                        Less than 2 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                      disabled={
                                                        passenger.infant +
                                                          passenger.adult +
                                                          passenger.child >=
                                                        9
                                                          ? true
                                                          : false
                                                      }
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            infant:
                                                              prev.infant + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <span className="count incount">
                                                      {passenger.infant}
                                                    </span>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            infant:
                                                              prev.infant - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection">
                                              <h6>Cabin Class</h6>
                                              <div>
                                                <select
                                                  className="form-select"
                                                  onChange={(e) =>
                                                    setCategory(e.target.value)
                                                  }
                                                >
                                                  {/* <option value="">
                                                    Choose Cabin Class
                                                  </option> */}
                                                  {categories.map(
                                                    (category) => (
                                                      <option
                                                        key={category.title}
                                                        value={category.value}
                                                      >
                                                        {category.title}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span>{category}</span>
                                    </div>
                                  </div>
                                  <div className="top_form_search_button">
                                    <button
                                      // to="/flight-search"
                                      className="btn btn_theme btn_md"
                                      onClick={(e) => searchFlightHandler(e)}
                                    >
                                      Search
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="roundtrip"
                        role="tabpanel"
                        aria-labelledby="roundtrip-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form action="#!">
                                <div className="row">
                                  <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>From</p>
                                      {/* <input
                                        type="text"
                                        required
                                        placeholder="LHR"
                                        value={origin}
                                        onChange={(e) =>
                                          setOrigin(e.target.value)
                                        }
                                        
                                      /> */}
                                      <CustomAsyncSelect
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        defaultOptions
                                        onChange={(e) => {
                                          setOrigin(e.value);
                                          setFullOrigin(e);
                                        }}
                                        placeholder="Origin"
                                        defaultValue={
                                          fullOrigin
                                            ? {
                                                label: fullOrigin?.label,
                                                value: fullOrigin?.value,
                                              }
                                            : null
                                        }
                                      />
                                      <span>
                                        {fullOrigin?.value} -{" "}
                                        {fullOrigin?.label}
                                      </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>To</p>

                                      <CustomAsyncSelect
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        defaultOptions
                                        onChange={(e) => {
                                          setDestination(e.value);
                                          setFullDestination(e);
                                        }}
                                        placeholder="Destination"
                                        defaultValue={
                                          fullDestination
                                            ? {
                                                label: fullDestination?.label,
                                                value: fullDestination?.value,
                                              }
                                            : null
                                        }
                                      />
                                      <span>
                                        {fullDestination?.value} -{" "}
                                        {fullDestination?.label}
                                      </span>
                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                        <i className="fas fa-exchange-alt" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date custom-date-input">
                                          <p>Journey date</p>
                                          <input
                                            type="date"
                                            required
                                            value={departureDate}
                                            onChange={(e) =>
                                              setDepartureDate(e.target.value)
                                            }
                                          />
                                          <span>
                                            {departureDate
                                              ? getDay(departureDate)
                                              : ""}
                                          </span>
                                        </div>
                                        <div className="Journey_date">
                                          <p>Return date</p>
                                          <input
                                            type="date"
                                            required
                                            value={returnDate}
                                            onChange={(e) =>
                                              setReturnDate(e.target.value)
                                            }
                                          />
                                          <span>
                                            {returnDate
                                              ? getDay(returnDate)
                                              : ""}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      <p>Passenger, Class </p>
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          style={{
                                            color:
                                              passenger.infant +
                                                passenger.adult +
                                                passenger.child ===
                                              0
                                                ? "#818090"
                                                : "black",
                                          }}
                                        >
                                          {passenger.infant +
                                            passenger.adult +
                                            passenger.child}{" "}
                                          Passengers
                                        </button>
                                        <span>
                                          {passenger.adult !== 0 &&
                                            `${passenger.adult} adult `}{" "}
                                          {passenger.child !== 0 &&
                                            `${passenger.child} child `}{" "}
                                          {passenger.infant !== 0 &&
                                            `${passenger.infant} infant `}
                                        </span>

                                        {passenger.infant +
                                          passenger.adult +
                                          passenger.child >=
                                        9 ? (
                                          <span className="text-danger">
                                            Maximum 9 passengers allowed. (6
                                            Adults)
                                          </span>
                                        ) : null}
                                        <div
                                          className="dropdown-menu dropdown_passenger_info dropdown-menu-end"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    {/* <span className="count pcount">
                                                      {passenger.adult}
                                                    </span> */}
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      disabled={
                                                        passenger.infant +
                                                          passenger.adult +
                                                          passenger.child >=
                                                          9 ||
                                                        passenger.adult >= 6
                                                          ? true
                                                          : false
                                                      }
                                                      type="button"
                                                      className="btn-add"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            adult:
                                                              prev.adult + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <span className="count pcount">
                                                      {passenger.adult}
                                                    </span>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            adult:
                                                              prev.adult - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    {/* <span className="count ccount">
                                                      {passenger.child}
                                                    </span> */}
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Children
                                                      </p>
                                                      <span>
                                                        2 - Less than 12 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-c"
                                                      disabled={
                                                        passenger.infant +
                                                          passenger.adult +
                                                          passenger.child >=
                                                        9
                                                          ? true
                                                          : false
                                                      }
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            child:
                                                              prev.child + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <span className="count pcount">
                                                      {passenger.child}
                                                    </span>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-c"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            child:
                                                              prev.child - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    {/* <span className="count incount">
                                                      {passenger.infant}
                                                    </span> */}
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Infant
                                                      </p>
                                                      <span>
                                                        Less than 2 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                      disabled={
                                                        passenger.infant +
                                                          passenger.adult +
                                                          passenger.child >=
                                                        9
                                                          ? true
                                                          : false
                                                      }
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            infant:
                                                              prev.infant + 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                    <span className="count pcount">
                                                      {passenger.infant}
                                                    </span>
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                      onClick={() =>
                                                        setPassenger(
                                                          (prev) => ({
                                                            ...prev,
                                                            infant:
                                                              prev.infant - 1,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection">
                                              <h6>Cabin Class</h6>
                                              <select
                                                className="form-select"
                                                onChange={(e) =>
                                                  setCategory(e.target.value)
                                                }
                                              >
                                                {categories.map((category) => (
                                                  <option
                                                    key={category.title}
                                                    value={category.value}
                                                  >
                                                    {category.title}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <span>{category}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="top_form_search_button">
                                  <button
                                    // to="/flight-search"
                                    className="btn btn_theme btn_md"
                                    onClick={(e) => {
                                      console.log("clicked");
                                      returnFlightSearchHandler(e);
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="multi_city"
                        role="tabpanel"
                        aria-labelledby="multi_city-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form action="#!">
                                <div className="multi_city_form_wrapper">
                                  <div className="multi_city_form">
                                    <div className="row">
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>From</p>
                                          <input
                                            type="text"
                                            defaultValue="New York"
                                          />
                                          <span>
                                            DAC, Hazrat Shahajalal
                                            International...
                                          </span>
                                          <div className="plan_icon_posation">
                                            <i className="fas fa-plane-departure" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>To</p>
                                          <input
                                            type="text"
                                            defaultValue="Destination "
                                          />
                                          <span>LCY, London city airport </span>
                                          <div className="plan_icon_posation">
                                            <i className="fas fa-plane-arrival" />
                                          </div>
                                          <div className="range_plan">
                                            <i className="fas fa-exchange-alt" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                        <div className="form_search_date">
                                          <div className="flight_Search_boxed date_flex_area">
                                            <div className="Journey_date">
                                              <p>Journey date</p>
                                              <input
                                                type="date"
                                                defaultValue="2022-05-05"
                                              />
                                              <span>Thursday</span>
                                            </div>
                                            <div className="Journey_date">
                                              <p>Return date</p>
                                              <input
                                                type="date"
                                                defaultValue="2022-05-10"
                                              />
                                              <span>Saturday</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed dropdown_passenger_area">
                                          <p>Passenger, Class </p>
                                          <div className="dropdown">
                                            <button
                                              className="dropdown-toggle final-count"
                                              data-toggle="dropdown"
                                              type="button"
                                              id="dropdownMenuButton1"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              0 Passenger
                                            </button>
                                            <div
                                              className="dropdown-menu dropdown_passenger_info dropdown-menu-end"
                                              aria-labelledby="dropdownMenuButton1"
                                            >
                                              <div className="traveller-calulate-persons">
                                                <div className="passengers">
                                                  <h6>Passengers</h6>
                                                  <div className="passengers-types">
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count pcount">
                                                          2
                                                        </span>
                                                        <div className="type-label">
                                                          <p>Adult</p>
                                                          <span>12+ yrs</span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count ccount">
                                                          0
                                                        </span>
                                                        <div className="type-label">
                                                          <p className="fz14 mb-xs-0">
                                                            Children
                                                          </p>
                                                          <span>
                                                            2 - Less than 12 yrs
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add-c"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract-c"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count incount">
                                                          0
                                                        </span>
                                                        <div className="type-label">
                                                          <p className="fz14 mb-xs-0">
                                                            Infant
                                                          </p>
                                                          <span>
                                                            Less than 2 yrs
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add-in"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract-in"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="cabin-selection">
                                                  <h6>Cabin Class</h6>
                                                  <div className="cabin-list">
                                                    <button
                                                      type="button"
                                                      className="label-select-btn"
                                                    >
                                                      <span className="muiButton-label">
                                                        Economy
                                                      </span>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="label-select-btn active"
                                                    >
                                                      <span className="muiButton-label">
                                                        Business
                                                      </span>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="label-select-btn"
                                                    >
                                                      <span className="MuiButton-label">
                                                        First Class{" "}
                                                      </span>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <span>Business</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="multi_city_form">
                                    <div className="row">
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>From</p>
                                          <input
                                            type="text"
                                            defaultValue="Origin"
                                          />
                                          <span>
                                            DAC, Hazrat Shahajalal
                                            International...
                                          </span>
                                          <div className="plan_icon_posation">
                                            <i className="fas fa-plane-departure" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed">
                                          <p>To</p>
                                          <input
                                            type="text"
                                            defaultValue="London "
                                          />
                                          <span>LCY, London city airport </span>
                                          <div className="plan_icon_posation">
                                            <i className="fas fa-plane-arrival" />
                                          </div>
                                          <div className="range_plan">
                                            <i className="fas fa-exchange-alt" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                        <div className="form_search_date">
                                          <div className="flight_Search_boxed date_flex_area">
                                            <div className="Journey_date">
                                              <p>Journey date</p>
                                              <input
                                                type="date"
                                                defaultValue="2022-05-05"
                                              />
                                              <span>Thursday</span>
                                            </div>
                                            <div className="Journey_date">
                                              <p>Return date</p>
                                              <input
                                                type="date"
                                                defaultValue="2022-05-12"
                                              />
                                              <span>Saturday</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                        <div className="flight_Search_boxed dropdown_passenger_area">
                                          <p>Passenger, Class </p>
                                          <div className="dropdown">
                                            <button
                                              className="dropdown-toggle final-count"
                                              data-toggle="dropdown"
                                              type="button"
                                              id="dropdownMenuButton1"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              0 Passenger
                                            </button>
                                            <div
                                              className="dropdown-menu dropdown_passenger_info dropdown-menu-end"
                                              aria-labelledby="dropdownMenuButton1"
                                            >
                                              <div className="traveller-calulate-persons">
                                                <div className="passengers">
                                                  <h6>Passengers</h6>
                                                  <div className="passengers-types">
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count pcount">
                                                          2
                                                        </span>
                                                        <div className="type-label">
                                                          <p>Adult</p>
                                                          <span>12+ yrs</span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count ccount">
                                                          0
                                                        </span>
                                                        <div className="type-label">
                                                          <p className="fz14 mb-xs-0">
                                                            Children
                                                          </p>
                                                          <span>
                                                            2 - Less than 12 yrs
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add-c"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract-c"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="passengers-type">
                                                      <div className="text">
                                                        <span className="count incount">
                                                          0
                                                        </span>
                                                        <div className="type-label">
                                                          <p className="fz14 mb-xs-0">
                                                            Infant
                                                          </p>
                                                          <span>
                                                            Less than 2 yrs
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="button-set">
                                                        <button
                                                          type="button"
                                                          className="btn-add-in"
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                        <button
                                                          type="button"
                                                          className="btn-subtract-in"
                                                        >
                                                          <i className="fas fa-minus" />
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="cabin-selection">
                                                  <h6>Cabin Class</h6>
                                                  <div className="cabin-list">
                                                    <button
                                                      type="button"
                                                      className="label-select-btn"
                                                    >
                                                      <span className="muiButton-label">
                                                        Economy
                                                      </span>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="label-select-btn active"
                                                    >
                                                      <span className="muiButton-label">
                                                        Business
                                                      </span>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="label-select-btn"
                                                    >
                                                      <span className="MuiButton-label">
                                                        First Class{" "}
                                                      </span>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <span>Business</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="add_multy_form">
                                      <button
                                        type="button"
                                        id="addMulticityRow"
                                      >
                                        + Add another flight
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="top_form_search_button">
                                  <button
                                    // to="/flight-search"
                                    className="btn btn_theme btn_md"
                                  >
                                    Search
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tours"
                    role="tabpanel"
                    aria-labelledby="tours-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tour_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Destination</p>
                                  <input
                                    type="text"
                                    placeholder="Where are you going?"
                                  />
                                  <span>Where are you going?</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Journey date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-03"
                                      />
                                      <span>Thursday</span>
                                    </div>
                                    <div className="Journey_date">
                                      <p>Return date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-05"
                                      />
                                      <span>Thursday</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed dropdown_passenger_area">
                                  <p>Passenger, Class </p>
                                  <div className="dropdown">
                                    <button
                                      className="dropdown-toggle final-count"
                                      data-toggle="dropdown"
                                      type="button"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      0 Passenger
                                    </button>
                                    <div
                                      className="dropdown-menu r_info"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <div className="traveller-calulate-persons">
                                        <div className="passengers">
                                          <h6>Passengers</h6>
                                          <div className="passengers-types">
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count pcount">
                                                  2
                                                </span>
                                                <div className="type-label">
                                                  <p>Adult</p>
                                                  <span>12+ yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count ccount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Children
                                                  </p>
                                                  <span>
                                                    2 - Less than 12 yrs
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-c"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-c"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count incount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Infant
                                                  </p>
                                                  <span>Less than 2 yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-in"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-in"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="cabin-selection">
                                          <h6>Cabin Class</h6>
                                          <div className="cabin-list">
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="muiButton-label">
                                                Economy
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn active"
                                            >
                                              <span className="muiButton-label">
                                                Business
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="MuiButton-label">
                                                First Class{" "}
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span>Business</span>
                                </div>
                              </div>
                              <div className="top_form_search_button">
                                <button
                                  // to="/flight-search"
                                  className="btn btn_theme btn_md"
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="hotels"
                    role="tabpanel"
                    aria-labelledby="hotels-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tour_search_form">
                          <form action="#!">
                            <div className="row">
                              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="flight_Search_boxed">
                                  <p>Destination</p>
                                  <input
                                    type="text"
                                    placeholder="Where are you going?"
                                  />
                                  <span>Where are you going?</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="form_search_date">
                                  <div className="flight_Search_boxed date_flex_area">
                                    <div className="Journey_date">
                                      <p>Journey date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-03"
                                      />
                                      <span>Thursday</span>
                                    </div>
                                    <div className="Journey_date">
                                      <p>Return date</p>
                                      <input
                                        type="date"
                                        defaultValue="2022-05-05"
                                      />
                                      <span>Thursday</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                <div className="flight_Search_boxed dropdown_passenger_area">
                                  <p>Passenger, Class </p>
                                  <div className="dropdown">
                                    <button
                                      className="dropdown-toggle final-count"
                                      data-toggle="dropdown"
                                      type="button"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      0 Passenger
                                    </button>
                                    <div
                                      className="dropdown-menu dropdown_passenger_info dropdown-menu-end"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <div className="traveller-calulate-persons">
                                        <div className="passengers">
                                          <h6>Passengers</h6>
                                          <div className="passengers-types">
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count pcount">
                                                  2
                                                </span>
                                                <div className="type-label">
                                                  <p>Adult</p>
                                                  <span>12+ yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count ccount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Children
                                                  </p>
                                                  <span>
                                                    2 - Less than 12 yrs
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-c"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-c"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="passengers-type">
                                              <div className="text">
                                                <span className="count incount">
                                                  0
                                                </span>
                                                <div className="type-label">
                                                  <p className="fz14 mb-xs-0">
                                                    Infant
                                                  </p>
                                                  <span>Less than 2 yrs</span>
                                                </div>
                                              </div>
                                              <div className="button-set">
                                                <button
                                                  type="button"
                                                  className="btn-add-in"
                                                >
                                                  <i className="fas fa-plus" />
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn-subtract-in"
                                                >
                                                  <i className="fas fa-minus" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="cabin-selection">
                                          <h6>Cabin Class</h6>
                                          <div className="cabin-list">
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="muiButton-label">
                                                Economy
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn active"
                                            >
                                              <span className="muiButton-label">
                                                Business
                                              </span>
                                            </button>
                                            <button
                                              type="button"
                                              className="label-select-btn"
                                            >
                                              <span className="MuiButton-label">
                                                First Class{" "}
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <span>Business</span>
                                </div>
                              </div>
                              <div className="top_form_search_button">
                                <button
                                  // to="/flight-search"
                                  className="btn btn_theme btn_md"
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormSection;
