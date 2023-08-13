import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <main className="min-vh-100 d-flex flex-column bg-white">
      <Navbar />
      <div className="flex-fill d-flex flex-column">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
