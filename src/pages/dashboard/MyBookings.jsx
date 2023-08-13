import React, { useEffect, useState } from "react";
import Layout from "../../components/global/Layout";
import MyBookingsTable from "../../components/tables/MyBookingsTable";
import CommonBannerSection from "../../components/sections/CommonBannerSection";
import DashboardSidebar from "../../components/global/DashboardSidebar";
import { getDatabase, ref, query, orderByChild } from "firebase/database";
import { getAuth } from "firebase/auth";
import { doc, getDocs, collection, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useSelector } from "react-redux";

const MyBookings = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const [myBookings, setBookings] = useState([]);

  const getData = async () => {
    const db = getFirestore();
    const q = query(collection(db, "bookings"), where("user", "==", auth?.uid));
    const noteSnapshot = await getDocs(q);
    const notesList = noteSnapshot.docs.map((doc) => doc.data());
    setBookings(notesList);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {/* Common Banner Area */}
      <CommonBannerSection title="My bookings" pageName="My bookings" />
      {/* Dashboard Area */}
      <section id="dashboard_main_arae" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <DashboardSidebar />
            </div>
            <div className="col-lg-8">
              <div className="dashboard_main_top">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="dashboard_top_boxed">
                      <div className="dashboard_top_icon">
                        <i className="fas fa-shopping-bag" />
                      </div>
                      <div className="dashboard_top_text">
                        <h3>Total bookings</h3>
                        <h1>231</h1>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="dashboard_top_boxed">
                      <div className="dashboard_top_icon">
                        <i className="fas fa-sync" />
                      </div>
                      <div className="dashboard_top_text">
                        <h3>Pending bookings</h3>
                        <h1>23</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <MyBookingsTable data={myBookings} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyBookings;
