// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {EnsClone} from "../src/EnsClone.sol";
import {DeployEnsClone} from "../script/deployEnsClone.s.sol";

contract TestEnsClone is Test {
    EnsClone ensClone;
    address user = makeAddr("user");

    function setUp() public {
        DeployEnsClone deployEnsClone = new DeployEnsClone();
        ensClone = deployEnsClone.run();
        vm.deal(user, 100 ether);
    }

    function testUserCanRegisterd() public {
        vm.startPrank(user);
        ensClone.register("aditya");
        vm.stopPrank();
        address userAddress = ensClone.getAddress("aditya");
        console.log(userAddress, user);
        assert(userAddress == user);
    }

    function testUserCanUpdateThereName() public {
        vm.startPrank(user);
        ensClone.register("aditya");
        ensClone.update("aditya", "xyz");
        vm.stopPrank();
        address aditya = ensClone.getAddress("aditya");
        address xyz = ensClone.getAddress("xyz");
        assert(aditya == address(0));
        assert(xyz == user);
    }

    function testGetErrorIfUserNotOwner() public {
        vm.prank(user);
        ensClone.register("aditya");
        vm.expectRevert();
        ensClone.update("aditya", "xyz");
    }

    function testUserCanRemoveThereName() public {
        vm.prank(user);
        ensClone.register("aditya");

        vm.prank(user);
        ensClone.remove("aditya");

        address aditya = ensClone.getAddress("aditya");
        assert(aditya == address(0));
    }
}
