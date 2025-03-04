"use client";
import React, { useEffect, useState } from "react";

const PopUp = ({ setOpenModel, getDonations, donate, donateFunction }) => {
  const [amount, setAmount] = useState("");
  const [allDonateData, setAllDonateData] = useState([]);

  const createDonation = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      console.error("Invalid donation amount");
      return;
    }

    try {
      const data = await donateFunction(donate.pId, amount);
      console.log("Donation successful:", data);
      setOpenModel(false);  // Close the modal after successful donation
    } catch (error) {
      console.log("Donation failed:", error);
    }
  };

  useEffect(() => {
    const fetchDonationsData = async () => {
      const donationData = await getDonations(donate.pId);
      setAllDonateData(donationData);
    };

    fetchDonationsData();
  }, [donate.pId]); // Dependency on donate.pId to refresh data when campaign changes

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-fill bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between border-b p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{donate.title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpenModel(false)}
              >
                <span className="bg-transparent text-black opacity-5 h6 w-6 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>

            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {donate.description}
              </p>

              <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="amount"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                required
                name="amount"
                id="amount"
              />

              {allDonateData?.map((donate, i) => (
                <p key={i} className="my-4 text-slate-500 text-lg leading-relaxed">
                  {i + 1}: {donate.donation} {donate.donator}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOpenModel(false)}
              >
                Close
              </button>

              <button
                className="text-white background active:bg-emerald-600 font-bold uppercase px-6 py-3 shadow hover:shadow-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => createDonation()}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default PopUp;
