// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/NFTGiveaway.sol";

contract Deploy is Script {
    function run() external {
        vm.createSelectFork(vm.rpcUrl(vm.envString("CHAIN")));

        vm.startBroadcast();

        address forwarder = vm.envAddress("ESSENTIAL_FORWARDER");
        address nftContract = vm.envAddress("NFT_CONTRACT");
        uint256 nftChainId = vm.envUint("NFT_CHAIN_ID");

        address randomizerAddress = chainEnvAddress("RANDOMIZER");

        NFTGiveaway giveaway = new NFTGiveaway(
            forwarder,
            nftContract,
            nftChainId,
            randomizerAddress
        );

        console.log("Deployed NFTGiveaway at", address(giveaway));
        vm.stopBroadcast();
    }

    function chainEnvUint(string memory key) internal view returns (uint256) {
        string memory chain = vm.envString("CHAIN");
        uint256 val = vm.envUint(string(abi.encodePacked(chain, "_", key)));

        return val;
    }

    function chainEnvAddress(string memory key) internal view returns (address) {
        string memory chain = vm.envString("CHAIN");
        address val = vm.envAddress(string(abi.encodePacked(chain, "_", key)));

        return val;
    }
}
