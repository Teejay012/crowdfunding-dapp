"use client"
import React, { useState, useContext } from 'react';
import Image from 'next/image';

import { CrowdfundingContext } from "../contexts/Crowdfunding"

const Hero = ({ titleData, createCampaign }) => {

  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  });


  const createNewCampaign = async (e) => {
    e.preventDefault();
    console.log("Campaign data:", campaign); // Add this line
    try {
      const data = await createCampaign(campaign);
      console.log("Created campaign:", data);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };


  return (
    <div className='relative'>
      <span className="coverLine"></span>
      <img
        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
        alt="Cover"
        // width={100}
        // height={100}
        className='absolute inset-0 object-cover w-full h-full'
      />

      <div className="relative bg-opacity-75 backgroundMain">
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>

        <div className="relative flex flex-col gap-3 md:flex-row px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:py-20">
          <div className="flex flex-col justify-start gap-5 xl:w-7/12">
            <h2 className="max-w-lg font-sans text-3xl font-bold tracking-light text-white sm:text-5xl sm:leading-non">
              Your Web3 Developer <br className="hidden md:block" />
              Crowd Funding Application
            </h2>
            <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga nihil minima officiis dignissimos, consequuntur quam ex aperiam! Ipsam quidem quos ratione, nulla facere, assumenda quibusdam repellat dicta consequuntur minima deleniti?
            </p>

            <a href="/"
              aria-label=''
              className='flex items-center justify-start font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700 text-gray-200'
            >
              Learn More
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </a>
          </div>

          <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
              <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                Campaign
              </h3>

              <form onSubmit={createNewCampaign}>
                <div className="mb-1 sm:mb-2">
                  <label htmlFor="campaignTitle" className="inline-block mb-1 font-me">
                    Title
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setCampaign({ ...campaign, title: e.target.value, })}
                    placeholder='title'
                    className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
                    id="campaignTitle"
                    required
                    name="campaignTitle"
                    value={campaign.title}
                  />
                </div>

                <div className="mb-1 sm:mb-2">
                  <label htmlFor="campaignDescription" className="inline-block mb-1 font-me">
                    Description
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setCampaign({ ...campaign, description: e.target.value, })}
                    placeholder='Description'
                    className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
                    id="campaignDescription"
                    required
                    name="campaignDescription"
                    value={campaign.description}
                  />
                </div>

                <div className="mb-1 sm:mb-2">
                  <label htmlFor="campaignTargetAmount" className="inline-block mb-1 font-me">
                    Target Amount
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setCampaign({ ...campaign, amount: e.target.value })}
                    placeholder="amount"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="campaignTargetAmount"
                    name="campaignTargetAmount"
                    value={campaign.amount}
                  />
                </div>

                <div className="mb-1 sm:mb-2">
                  <label htmlFor="deadline" className="inline-block mb-1 font-me">
                    Deadline
                  </label>
                  <input
                    type="date"
                    onChange={(e) => setCampaign({ ...campaign, deadline: e.target.value, })}
                    placeholder='Date'
                    required
                    className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
                    id="deadline"
                    name="deadline"
                    value={campaign.deadline}
                  />
                </div>

                <div className="mt-4 mb-2 sm:mb-4">
                  <button
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-medium text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none newColor"
                    type="submit"
                  >
                    Create Campaign
                  </button>
                </div>

                <p className="text-xs text-gray-600 sm:text-sm">
                  Create your Campaign to raise funds
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero