// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Crowdfunding } from "../src/Crowdfunding.sol";
import { Script, console } from "forge-std/Script.sol";

contract DeployCrowdfunding is Script {

    function run() public {
        // Start the broadcast (this broadcasts the deployment)
        vm.startBroadcast();

        // Deploy the Crowdfunding contract
        Crowdfunding crowdfunding = new Crowdfunding();

        // You can now interact with the deployed contract if needed
        console.log("Crowdfunding contract deployed at:", address(crowdfunding));

        // End the broadcast (finish broadcasting the transactions)
        vm.stopBroadcast();
    }
}