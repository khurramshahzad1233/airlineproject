import React from "react";
import Layout from "../../components/global/Layout";
import CommonBannerSection from "../../components/sections/CommonBannerSection";
import CtaSection from "../../components/sections/CtaSection";
import DashboardSidebar from "../../components/global/DashboardSidebar";
import { useSelector } from "react-redux";
import firebase from "../../config/fbConfig";

const MyProfile = () => {
  const profile = useSelector((state) => state.firebase.profile);
  const auth = firebase.auth;
  const user = auth().currentUser;

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword } = e.target.elements;

    const credential = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword.value
    );

    try {
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword.value);
      console.log("Password changed successfully!");
    } catch (error) {
      console.log("Error changing password:", error);
    }
  };

  return (
    <Layout>
      {/* Common Banner Area */}
      <CommonBannerSection
        title="My Profile"
        pageName="My Profile"
        link="/my-bookings"
        linkName="My bookings"
      />
      {/* Dashboard Area */}
      <section id="dashboard_main_arae" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <DashboardSidebar />
            </div>
            <div className="col-lg-8">
              <div className="dashboard_common_table">
                <h3>My Profile</h3>
                <div className="profile_update_form">
                  <form
                    onSubmit={handleChangePassword}
                    action="!#"
                    id="profile_form_area"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="f-name">First name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="f-name"
                            value={profile?.firstName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="l-name">Last name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="l-name"
                            value={profile?.lastName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="mail-address">Email address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="mail-address"
                            value={profile?.email}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="mobil-number">Mobile number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="mobil-number"
                            value={profile?.phoneNumber}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="u-name">User name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="u-name"
                            value={profile?.username}
                            disabled
                          />
                        </div>
                      </div>
                      {/* <div className="col-lg-6">
                        <div className="form-group change_password_field">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            defaultValue="cdkdkdd"
                          />
                          <p>Change password</p>
                        </div>
                      </div> */}
                      <div className="change_password_input_boxed">
                        <h3>Change password</h3>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <input
                                type="currentPassword"
                                className="form-control"
                                placeholder="Old Password"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <input
                                type="newPassword"
                                className="form-control"
                                placeholder="New Password"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn_theme btn_md"
                              >
                                Change Password
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </Layout>
  );
};

export default MyProfile;
