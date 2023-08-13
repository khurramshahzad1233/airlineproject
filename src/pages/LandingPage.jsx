import React, { useState } from "react";
import Layout from "../components/global/Layout";
import BannerSection from "../components/sections/BannerSection";
import FormSection from "../components/sections/FormSection";
import TopDestinationSection from "../components/sections/TopDestinationSection";
import ExploreSection from "../components/sections/ExploreSection";
import OfferSection from "../components/sections/OfferSection";
import PromotionalToursSection from "../components/sections/PromotionalToursSection";
import CtaSection from "../components/sections/CtaSection";
import GuestModal from "../components/modals/GuestModal";

const LandingPage = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      {/* <GuestModal show={show} onClose={() => setShow(false)} /> */}
      <Layout>
        <BannerSection />
        <FormSection />
        <TopDestinationSection />
        <ExploreSection />
        <OfferSection />
        <PromotionalToursSection />

        <CtaSection />
      </Layout>
    </>
  );
};

export default LandingPage;
