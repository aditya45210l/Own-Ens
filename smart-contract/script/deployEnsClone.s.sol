// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {EnsClone} from "../src/EnsClone.sol";

contract DeployEnsClone is Script {

    function run() public returns(EnsClone) {
        vm.startBroadcast();
        EnsClone ensClone = new EnsClone();
        vm.stopBroadcast();
        return ensClone;
    }
}
