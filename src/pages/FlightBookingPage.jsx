import React, { useEffect, useState } from "react";
import Layout from "../components/global/Layout";
import CtaSection from "../components/sections/CtaSection";
import TourTravelDateCard from "../components/cards/TourTravelDateCard";
import { Flightstate } from "../context/Flightprovider";
import axios from "axios";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import StepComponent from "../components/steps/StepComponent";
import LoadingModal from "../components/modals/LoadingModal";
import uuid from "react-uuid";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const FlightBookingPage = () => {
  const steps = [
    { stepNumber: 1, text: "search results" },
    { stepNumber: 2, text: "checkout" },
    { stepNumber: 3, text: "booking and payment", active: true },
    // { stepNumber: 4, text: "Payment" },
    // { stepNumber: 5, text: "your flight" },
  ];
  const { bookingData, departureDate } = Flightstate();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Payment by card");
  const [conversionRate, setConversionRate] = useState(null);
  const [fieldsNames] = useState([
    // { id: "gender", label: "Gender*", placeholder: "ex male/female" },
    { id: "title", label: "Enter Title*", placeholder: "Mr" },
    {
      id: "given_name",
      label: "First Name*",
      placeholder: "ex. Albert Thomas",
    },
    { id: "family_name", label: "Last Name*", placeholder: "ex. Milleer" },
    {
      id: "email",
      label: "Email Address*",
      placeholder: "ex. emailaddress@email.com",
    },
    {
      id: "phone_number",
      label: "Mobile Number*",
      placeholder: "ex. 202222222",
    },
    {
      id: "born_on",
      label: "Enter Date of Birth*",
      placeholder: "ex. DD/MM/YYYY",
    },
  ]);

  const user = useSelector((state) => state.firebase.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [passengerDetails, setPassengerDetails] = useState(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicFields",
  });

  useEffect(() => {
    if (bookingData.length === 0) {
      navigate("/");
    }
  }, [bookingData]);

  const updateDatabase = async (data, search) => {
    const db = getFirestore();
    if (user?.uid) {
      await addDoc(collection(db, "bookings"), {
        ...data,
        user: user.uid,
      });
    } else {
      await addDoc(collection(db, "unAuthBookings"), {
        ...data,
        user: search.data.passengers[0]?.email,
      });
    }

    // setLoading(false);
  };

  const passengerFormatterApi = (data) => {
    const passengerFinal = data.map((items, index) => ({
      ...items,
      id: bookingData.passengers[index].id,
    }));

    return passengerFinal;
  };

  const bookFlightHandler = async () => {
    let offerId = bookingData.id;
    let currency = bookingData.total_currency;
    let amount = bookingData.total_amount;

    setLoading(true);

    const searchParams = {
      data: {
        // slices: bookingData?.slices,
        selected_offers: [offerId],
        payments: [
          {
            type: "balance",
            currency: currency,
            amount: amount,
          },
        ],
        passengers: passengerFormatterApi(passengerDetails),
        type: "instant",
      },
    };

    try {
      console.log(
        "passengerFormatterApi(passengerDetails)",
        passengerFormatterApi(passengerDetails)
      );
      const response = await axios.post(
        `https://itnertripbackend-production.up.railway.app/api/search/flight/book`,
        searchParams
      );
      const createOrder = response.data;
      const bookingId = uuid();
      const firebaseData = { ...createOrder, bookingId: bookingId };
      updateDatabase(firebaseData, searchParams);
      localStorage.setItem("booking", JSON.stringify(bookingData));
      localStorage.setItem("searchParams", JSON.stringify(searchParams));
      localStorage.setItem("orderConfirm", JSON.stringify(createOrder));
      localStorage.setItem("BookingId", bookingId);
      axios
        .post(
          "https://itinertrip-backendfinal-production.up.railway.app/api/search/accesstoken"
        )
        .then((res) => {
          console.log("res", res);
          axios
            .post(
              "https://itinertrip-backendfinal-production.up.railway.app/api/search/create/order",
              {
                price: parseInt(
                  (bookingData?.total_amount * conversionRate +
                    25 * bookingData?.passengers.length * conversionRate +
                    (bookingData?.total_amount * conversionRate +
                      25 * bookingData?.passengers.length) *
                      0.05) *
                    100
                ),
                accesstoken: res.data.accesstoken,
                //price: bookingData.total_amount * 100,
                email: passengerFormatterApi(passengerDetails)[0].email,
                billingFName:
                  passengerFormatterApi(passengerDetails)[0].family_name,
                billingLName:
                  passengerFormatterApi(passengerDetails)[0].given_name,
              }
            )
            .then((response) => {
              window.location.href = response?.data?.link;
              console.log("res2", response);
            });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  };

  const passengerFormatter = (data) => {
    const newArray = [];

    for (let i = 0; i < data.length; i += 7) {
      const slicedObjects = data.slice(i, i + 7);
      const newObj = {};

      slicedObjects.forEach((obj) => {
        if (obj.fieldName === "title") {
          newObj[obj.fieldName] = obj.value;
          newObj["gender"] =
            obj.value === "Mr" || obj.value === "Mstr" ? "m" : "f";
        } else {
          newObj[obj.fieldName] = obj.value;
        }
      });

      newArray.push(newObj);
    }
    return newArray;
  };

  const isValidPhoneNumber = (value) => {
    const phoneNumberObject = parsePhoneNumberFromString(value);
    return !!phoneNumberObject && phoneNumberObject.isValid();
  };

  const onSubmit = (data) => {
    setPassengerDetails(passengerFormatter(data?.dynamicFields));
    console.log("data", data, passengerFormatter(data?.dynamicFields));
  };

  const isFactorialOf4 = (number) => {
    return number % 5 === 0;
  };

  useEffect(() => {
    if (bookingData) {
      for (let i = 0; i < bookingData?.passengers?.length; i++) {
        fieldsNames.forEach((element) =>
          append({
            fieldName: `${element.id}`,
            placeholder: element.placeholder,
            value: "",
            label: element.label,
          })
        );
      }
    }
  }, [bookingData]);

  useEffect(() => {
    if (passengerDetails !== null) {
      bookFlightHandler();
    }
  }, [passengerDetails]);

  const formatDate = (type) => {
    const currentDate = new Date();

    switch (type) {
      case "adult":
        currentDate.setFullYear(currentDate.getFullYear() - 12);
        break;

      case "child":
        currentDate.setFullYear(currentDate.getFullYear() - 2);
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
    }

    // Format the date as "YYYY-MM-DD"
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const formatDateMin = (type) => {
    const currentDate = new Date();
    switch (type) {
      case "adult":
        currentDate.setFullYear(currentDate.getFullYear() - 200);
        break;
      case "infant_without_seat":
        currentDate.setFullYear(currentDate.getFullYear() - 2);
        break;

      case "child":
        currentDate.setFullYear(currentDate.getFullYear() - 12);
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
    }

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  useEffect(() => {
    // Fetch exchange rates when the component mounts
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        "https://api.exchangeratesapi.io/v1/latest?access_key=dfdd7ef30fa3c0836cea652b83d4a72f&base=USD&symbols=MWK"
      );
      console.log("response", response);
      const rate = response.data.rates.MWK;
      setConversionRate(rate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  console.log("bookingData", bookingData, conversionRate);

  return (
    <>
      {console.log("errors", errors)}
      {bookingData.length !== 0 && (
        <Layout>
          <LoadingModal show={loading} />

          <section className="bg-white shadow-sm border-bottom">
            <div className="container">
              <ul className="nav gap-4 flex-nowrap overflow-auto">
                {steps.map((step) => (
                  <StepComponent
                    key={step.stepNumber}
                    stepNumber={step.stepNumber}
                    text={step.text}
                    active={step.active}
                  />
                ))}
              </ul>
            </div>
          </section>
          {/* Tour Booking Submission Areas */}
          <section id="tour_booking_submission" className="section_padding">
            <div className="container">
              <div className="px-0 mx-auto col-12 col-lg-12 col-xl-10">
                <h3 className="heading_theme mb-4">Passenger information</h3>
                <div className="row">
                  <div className="col-lg-7 col-xxl-8">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="tou_booking_form_Wrapper"
                    >
                      <div className="booking_tour_form">
                        <div className="tour_booking_form_box">
                          <div id="tour_bookking_form_item">
                            <div className="row">
                              {fields.map((field, index) => (
                                <>
                                  {index === 0 && (
                                    <div className="col-12">
                                      <h3 className="text-capitalize fw-semibold mb-4">
                                        {bookingData?.passengers[0].type}{" "}
                                        {index + 1}
                                      </h3>
                                    </div>
                                  )}

                                  <div className="col-lg-6" key={field.id}>
                                    <div className="form-group mb-3">
                                      <label className="form-label mb-1">
                                        {field?.label}
                                      </label>
                                      {field?.fieldName === "title" ? (
                                        <>
                                          <Controller
                                            // className="form-control bg_input"
                                            name={`dynamicFields[${index}].value`}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                              required: "Title is required.",
                                            }}
                                            render={({ field }) => (
                                              <>
                                                <select
                                                  className="form-control form-select bg_input"
                                                  {...field}
                                                >
                                                  <option value="">
                                                    Select Title
                                                  </option>
                                                  <option value="Mr">Mr</option>
                                                  <option value="Mrs">
                                                    Mrs
                                                  </option>
                                                  <option value="Ms">Ms</option>
                                                  <option value="Mstr">
                                                    Mstr
                                                  </option>
                                                </select>
                                                {/* <span>{fieldState.errors?.gender?.message}</span> */}
                                              </>
                                            )}
                                          />
                                          {errors &&
                                            errors.dynamicFields &&
                                            errors.dynamicFields[index] &&
                                            errors.dynamicFields[index]
                                              .value && (
                                              <span style={{ color: "red" }}>
                                                {
                                                  errors.dynamicFields[index]
                                                    .value.message
                                                }
                                              </span>
                                            )}
                                        </>
                                      ) : field?.fieldName === "born_on" ? (
                                        <>
                                          <Controller
                                            name={`dynamicFields[${index}].value`}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                              <input
                                                className="form-control bg_input"
                                                type="date"
                                                onChange={(e) =>
                                                  setValue(
                                                    `dynamicFields[${index}].value`,
                                                    e.target.value
                                                  )
                                                }
                                                max={formatDate(
                                                  bookingData?.passengers[
                                                    Math.floor((index + 1) / 7)
                                                  ].type
                                                )}
                                                min={formatDateMin(
                                                  bookingData?.passengers[
                                                    Math.floor((index + 1) / 7)
                                                  ].type
                                                )}
                                              />
                                            )}
                                            // rules={{
                                            //   validate: validateAge, // Add the custom validation rule here
                                            // }}
                                          />
                                          {errors &&
                                            errors.dynamicFields &&
                                            errors.dynamicFields[index] &&
                                            errors.dynamicFields[index]
                                              .value && (
                                              <span style={{ color: "red" }}>
                                                {
                                                  errors.dynamicFields[index]
                                                    .value.message
                                                }
                                              </span>
                                            )}
                                        </>
                                      ) : field?.fieldName ===
                                        "phone_number" ? (
                                        <>
                                          <Controller
                                            name={`dynamicFields[${index}].value`}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                              required:
                                                "Phone number is required",
                                              validate: {
                                                validPhone: (value) =>
                                                  isValidPhoneNumber(value) ||
                                                  "Invalid phone number",
                                              },
                                              // Add other validation rules for the phone number field
                                            }}
                                            render={({ field }) => (
                                              <PhoneInput
                                                className="phone-input bg_input form-control"
                                                // className="form-control bg_input"
                                                onChange={(e) =>
                                                  // console.log("number", e)
                                                  setValue(
                                                    `dynamicFields[${index}].value`,
                                                    e
                                                  )
                                                }
                                                placeholder="Enter your phone number"
                                              />
                                            )}
                                          />
                                          {errors &&
                                            errors.dynamicFields &&
                                            errors.dynamicFields[index] &&
                                            errors.dynamicFields[index]
                                              .value && (
                                              <span style={{ color: "red" }}>
                                                {
                                                  errors.dynamicFields[index]
                                                    .value.message
                                                }
                                              </span>
                                            )}
                                        </>
                                      ) : (
                                        <>
                                          <input
                                            key={field.id}
                                            {...register(
                                              `dynamicFields[${index}].value`,
                                              {
                                                required:
                                                  "this field is required",
                                              }
                                            )}
                                            type="text"
                                            className="form-control bg_input"
                                            placeholder={field?.placeholder}
                                          />
                                          {errors &&
                                            errors.dynamicFields &&
                                            errors.dynamicFields[index] &&
                                            errors.dynamicFields[index]
                                              .value && (
                                              <span style={{ color: "red" }}>
                                                {
                                                  errors.dynamicFields[index]
                                                    .value.message
                                                }
                                              </span>
                                            )}
                                          {/* {errors &&
                                            errors?.dynamicFields[index]
                                              ?.value && (
                                              <span style={{ color: "red" }}>
                                                required
                                              </span>
                                            )} */}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  {(index + 1) % 7 === 0 &&
                                  (index + 1) / 7 <
                                    bookingData?.passengers.length ? (
                                    <div className="m-1">
                                      <h3 className="text-capitalize">
                                        {
                                          bookingData?.passengers[
                                            (index + 1) / 7
                                          ].type
                                        }{" "}
                                        {(index + 1) / 7 + 1}
                                      </h3>
                                    </div>
                                  ) : null}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="booking_tour_form_submit">
                        <div className="form-check write_spical_check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="flexCheckDefaultf1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefaultf1"
                          >
                            I read and accept all{" "}
                            <Link to="/terms-of-use" target="_blank">
                              Terms and conditions
                            </Link>
                          </label>
                        </div>
                        <div className="d-flex flex-column-reverse flex-xl-row gap-3 mb-4 mb-xl-0">
                          <button
                            type="submit"
                            className="btn btn_theme btn_md pe-xl-5"
                            // onClick={(e) => bookFlightHandler(e)}
                          >
                            Pay now
                          </button>
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefaultf1"
                          >
                            By clicking the "Pay now" button, you accept the
                            fare rules and confirm the consent of the personal
                            data owner to processing the data in order to
                            conclude a contract of carriage
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-5 col-xxl-4">
                    <div className="tour_details_right_sidebar_wrapper">
                      <div className="tour_detail_right_sidebar">
                        <div className="tour_details_right_boxed">
                          <div className="tour_details_right_box_heading">
                            <h3>Flights</h3>
                          </div>

                          {/* flight information block */}
                          {bookingData?.slices &&
                          bookingData?.slices.length >= 1 ? (
                            bookingData?.slices.map((slice, index) => (
                              <div className="flight_sidebar_right" key={index}>
                                <div className="flight_search_left_sidebar">
                                  <div className="flight_search_destination_sidebar">
                                    <p>From</p>
                                    <h3>{slice?.origin?.city_name}</h3>
                                    <h6>{slice?.origin?.name}</h6>
                                  </div>
                                </div>
                                <div className="flight_search_middel_sidebar">
                                  <div className="flight_right_arrow_sidebar">
                                    <img
                                      className="img-color"
                                      src="assets/img/icon/right_arrow.png"
                                      alt="icon"
                                    />
                                    <h6>Non-stop</h6>
                                    <p>{slice?.duration} </p>
                                  </div>
                                  <div className="flight_search_destination_sidebar">
                                    <p>To</p>
                                    <h3>{slice?.destination?.city_name} </h3>
                                    <h6>{slice?.destination?.name} </h6>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <></>
                          )}

                          <div className="tour_package_details_bar_price">
                            <h5>Price</h5>
                            <div className="tour_package_bar_price">
                              {bookingData &&
                                bookingData?.passengers.map((item) => (
                                  <h3>
                                    {/* {bookingData?.total_currency} */}
                                    MWK{" "}
                                    {parseInt(
                                      bookingData?.total_amount * conversionRate
                                    )}{" "}
                                    <sub className="text-uppercase">
                                      {" "}
                                      / {item?.type} X 1
                                    </sub>{" "}
                                  </h3>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tour_detail_right_sidebar">
                        <div className="tour_details_right_boxed">
                          <div className="tour_details_right_box_heading">
                            <h3>Coupon code</h3>
                          </div>
                          <div className="coupon_code_area_booking">
                            <form action="#!">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control bg_input"
                                  placeholder="Enter coupon code"
                                />
                              </div>
                              <div className="coupon_code_submit">
                                <button className="btn btn_theme btn_md">
                                  Apply voucher
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="tour_detail_right_sidebar">
                        <div className="tour_details_right_boxed">
                          <div className="tour_details_right_box_heading">
                            <h3>Booking amount</h3>
                          </div>
                          <div className="tour_booking_amount_area">
                            <ul>
                              {bookingData &&
                                bookingData?.passengers.map((item) => (
                                  <li className="text-uppercase">
                                    {item.type} Price x 1{" "}
                                    <span>
                                      MWK{" "}
                                      {parseInt(
                                        bookingData?.total_amount *
                                          conversionRate
                                      )}
                                    </span>
                                  </li>
                                ))}

                              {/* <li>
                          Discount <span>-10%</span>
                        </li>
                        <li>
                          Tax<span>5%</span>
                        </li> */}
                              <li>
                                Services Charges{" "}
                                <span>
                                  MWK {(25 * conversionRate).toFixed(0)} x{" "}
                                  {bookingData?.passengers?.length}
                                </span>
                              </li>
                              <li>
                                Subtotal{" "}
                                <span>
                                  {/* {parseInt(bookingData?.total_amount) + 20} */}
                                  MWK{" "}
                                  {(
                                    parseInt(
                                      bookingData?.total_amount * conversionRate
                                    ) +
                                    25 *
                                      bookingData?.passengers.length *
                                      conversionRate +
                                    (bookingData?.total_amount *
                                      conversionRate +
                                      25 * bookingData?.passengers.length) *
                                      0.05
                                  ).toFixed(0)}
                                </span>
                              </li>
                            </ul>

                            <div className="total_subtotal_booking">
                              <h6>
                                Total Amount{" "}
                                <span>
                                  MWK{" "}
                                  {(
                                    parseInt(
                                      bookingData?.total_amount * conversionRate
                                    ) +
                                    25 *
                                      bookingData?.passengers.length *
                                      conversionRate +
                                    (bookingData?.total_amount *
                                      conversionRate +
                                      25 * bookingData?.passengers.length) *
                                      0.05
                                  ).toFixed(0)}
                                </span>{" "}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <CtaSection />
        </Layout>
      )}
    </>
  );
};

export default FlightBookingPage;
