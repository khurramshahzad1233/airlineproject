import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const SelectFlag = () => {
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    flagSrc:
      "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/gb.svg",
    name: "English",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    handleClose();
  };

  const languages = [
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/gb.svg",
      name: "English",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/id.svg",
      name: "Indonesia",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/ph.svg",
      name: "Tagalog",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/cn.svg",
      name: "简体中文",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/tw.svg",
      name: "繁體中文",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/th.svg",
      name: "ภาษาไทย",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/jp.svg",
      name: "日本語",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/my.svg",
      name: "Malay",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/kr.svg",
      name: "한국어",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/vn.svg",
      name: "Tiếng Việt",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/it.svg",
      name: "Italiano",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/de.svg",
      name: "Deutsch",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/es.svg",
      name: "Español",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/in.svg",
      name: "हिन्दी",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/fr.svg",
      name: "Français",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/ru.svg",
      name: "Русский",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/bd.svg",
      name: "বাংলা",
    },
    {
      flagSrc:
        "https://cdn.airpaz.com/cdn-cgi/image/w=20,h=15/https://www.airpaz.com/svg/country-flag/pt.svg",
      name: "Português",
    },
  ];

  return (
    <>
      <button onClick={handleShow} className="btn btn-flag p-0" type="button">
        <img
          className="d-block h-100 w-100"
          src={selectedLanguage.flagSrc}
          alt="..."
        />
      </button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Language</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row row-cols-2 row-cols-sm-3 gy-1">
            {languages.map((language, index) => (
              <div>
                <div
                  key={index}
                  className={`flag-box py-1 px-3 ${
                    selectedLanguage.name === language.name ? "active" : ""
                  }`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  <img
                    src={language.flagSrc}
                    width={20}
                    height={15}
                    className="me-2"
                    alt="..."
                  />
                  <span>{language.name}</span>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SelectFlag;
