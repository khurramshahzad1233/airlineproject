import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const SelectCurrency = () => {
  const [show, setShow] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    handleClose();
  };

  const currencies = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BND", name: "Brunei Dollar" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DKK", name: "Danish Krone" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "INR", name: "Indian Rupee" },
    { code: "ISK", name: "Icelandic Króna" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KHR", name: "Cambodian Riel" },
    { code: "KRW", name: "Korean Won" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "LAK", name: "Lao kip" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "MMK", name: "Myanmar Kyat" },
    { code: "MOP", name: "Macau Pataca" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NPR", name: "Nepalese Rupee" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "PEN", name: "Peruvian sol" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "PLN", name: "Polish Złoty" },
    { code: "QAR", name: "Qatari Riyal" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "THB", name: "Thai Baht" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "USD", name: "United States Dollar" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "ZAR", name: "South African Rand" },
  ];

  return (
    <>
      <button
        onClick={handleShow}
        className="btn p-0 border-0 text-black text-uppercase"
        type="button"
      >
        {selectedCurrency}
      </button>

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Currency</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row row-cols-2 row-cols-lg-3 gy-1">
            {currencies.map((currency) => (
              <div>
                <div
                  key={currency.code}
                  className={`flag-box px-2 py-1 small text-truncate ${
                    selectedCurrency === currency.code ? "active" : ""
                  }`}
                  onClick={() => handleCurrencySelect(currency.code)}
                >
                  <span className="small text-uppercase fw-bold me-2">
                    {currency.code}
                  </span>
                  <span className="small text-uppercase">{currency.name}</span>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SelectCurrency;
