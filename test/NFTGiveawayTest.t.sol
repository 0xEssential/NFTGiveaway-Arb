// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/NFTGiveaway.sol";

import {SigUtils} from "./SigUtils.sol";
import {EssentialForwarder} from "@xessential/contracts/fwd/EssentialForwarder.sol";

contract NFTGiveawayTest is Test {
    NFTGiveaway internal giveaway;

    EssentialForwarder internal forwarder;
    SigUtils internal sigUtils;

    address internal validNFTContract = address(42069);
    address internal invalidNFTContract = address(59);

    function metaTx(uint256 pk, bytes memory func, address nftContract, uint256 tokenId) internal {
        address eoa = vm.addr(pk);

        bytes memory encodedFunc = abi.encode(keccak256(func));

        IForwardRequest.ERC721ForwardRequest memory req =
            sigUtils.buildRequest(encodedFunc, eoa, eoa, nftContract, tokenId);

        bytes memory sig = sigUtils.signRequest(pk, req);
        bytes memory data = abi.encode(block.timestamp, req, sig);
        bytes memory response = sigUtils.mockOwnershipSig(req);
        forwarder.executeWithProof(response, data);
    }

    function assume(uint256 pk) internal pure {
        vm.assume(pk != 0);
        vm.assume(pk < 115792089237316195423570985008687907852837564279074904382605163141518161494337);
    }

    function setUp() public {
        uint256 ownershipSignerPrivateKey = 0xB12CE;
        address ownershipSigner = vm.addr(ownershipSignerPrivateKey);

        forwarder = new EssentialForwarder();

        giveaway = new NFTGiveaway(
            address(forwarder),
            validNFTContract,
            block.chainid,
            address(0)
        );

        sigUtils = new SigUtils(
            forwarder._domainSeparatorV4(),
            forwarder,
            address(giveaway),
            ownershipSignerPrivateKey
        );

        vm.startPrank(0x2cE6BD653220436eB8f35E146B0Dd1a6013E97a7);
        forwarder.setOwnershipSigner(ownershipSigner);
    }

    function testEnterGiveaway(uint256 pk) public {
        assume(pk);
        metaTx(pk, "enterGiveaway()", validNFTContract, 1);
        (uint256 _endsAt, uint256 totalCount, uint16 count) = giveaway.giveawayInfo(vm.addr(pk));

        assertEq(count, 1);
        assertEq(totalCount, 1);
    }

    function testEnterGiveawayTwice(uint256 pk, uint256 tokenId) public {
        assume(pk);
        metaTx(pk, "enterGiveaway()", validNFTContract, tokenId);
        metaTx(pk, "enterGiveaway()", validNFTContract, tokenId);

        (uint256 _endsAt, uint256 totalCount, uint16 count) = giveaway.giveawayInfo(vm.addr(pk));

        assertEq(count, 1);
        assertEq(totalCount, 1);
    }

    function testEnterGiveawayTwoTokens(uint256 pk, uint256 tokenA, uint256 tokenB) public {
        vm.assume(tokenA != tokenB);
        assume(pk);
        metaTx(pk, "enterGiveaway()", validNFTContract, tokenA);
        metaTx(pk, "enterGiveaway()", validNFTContract, tokenB);

        (uint256 _endsAt, uint256 totalCount, uint16 count) = giveaway.giveawayInfo(vm.addr(pk));

        assertEq(count, 2);
        assertEq(totalCount, 2);
    }

    function testEnterGiveawayInvalidCollection(uint256 pk, uint256 tokenId) public {
        assume(pk);
        metaTx(pk, "enterGiveaway()", invalidNFTContract, tokenId);

        (uint256 _endsAt, uint256 totalCount, uint16 count) = giveaway.giveawayInfo(vm.addr(pk));

        assertEq(count, 0);
        assertEq(totalCount, 0);
    }
}
