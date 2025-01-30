"use client";

import React, { useEffect, useContext, useState } from "react";
import { CrowdfundingContext } from "./contexts/Crowdfunding";
import { Hero, Card, PopUp } from "@/app/components";

const Home = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donateToCampaign,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdfundingContext);

  const [allCampaign, setAllCampaign] = useState();
  const [userCampaign, setUserCampaign] = useState();

  useEffect(() => {

    const getCampaignsData = getCampaigns();
    const getUserCampaignsData = getUserCampaigns();
    return async () => {
        const allData = await getCampaignsData;
        const userData = await getUserCampaignsData;

        setAllCampaign(allData);
        setUserCampaign(userData);

        console.log("All campaigns:", allCampaign);
        console.log("User campaigns:", userCampaign);
    };

  }, []);

  // Donation Popup State
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  return (
    <div>
      <Hero titleData={titleData} createCampaign={createCampaign} />

      <Card
        title="All Listed Campaign"
        allCampaign={allCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      <Card
        title="Your Created Campaign"
        allCampaigns={userCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />
          

      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donateToCampaign}
        />
      )}

    </div>
  );
};

export default Home;
