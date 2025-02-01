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

  const [allCampaign, setAllCampaign] = useState([]);
  const [userCampaign, setUserCampaign] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getCampaigns();
        const userData = await getUserCampaigns();

        setAllCampaign(allData);
        setUserCampaign(userData);

        console.log("All campaigns:", allData);
        console.log("User campaigns:", userData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []); // Run only once on mount

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
        allCampaign={userCampaign}
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
