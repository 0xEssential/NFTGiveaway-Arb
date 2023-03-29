// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@xessential/contracts/fwd/EssentialERC2771Context.sol";
import "./IRandomizer.sol";

contract NFTGiveaway is EssentialERC2771Context {
    address public nftContract;
    uint256 public nftChainId;
    uint256 public endsAt;

    mapping(uint256 => address) public tokenEntries;
    mapping(address => uint16) public userEntries;
    address[] public entrants;
    address public winner;

    uint256 public randomId;
    IRandomizer public randomizer;

    constructor(address trustedForwarder, address _nftContract, uint256 _nftChainId, address _randomizer)
        EssentialERC2771Context(trustedForwarder)
    {
        nftContract = _nftContract;
        nftChainId = _nftChainId;
        endsAt = block.timestamp + 7 days;
        randomizer = IRandomizer(_randomizer);
    }

    function giveawayInfo(address user) external view returns (uint256, uint256, uint16) {
        return (endsAt, entrants.length, userEntries[user]);
    }

    function enterGiveaway() external onlyForwarder {
        require(block.timestamp < endsAt, "Giveaway has ended");

        IForwardRequest.NFT memory nft = _msgNFT();

        require(nft.chainId == nftChainId, "Invalid NFT chain ID");
        require(nft.contractAddress == nftContract, "Invalid NFT contract");
        require(tokenEntries[nft.tokenId] == address(0), "NFT already entered");

        tokenEntries[nft.tokenId] = _msgSender();
        entrants.push(_msgSender());
        unchecked {
            ++userEntries[_msgSender()];
        }
    }

    function clearRaffle() external {
        require(randomId == 0, "Already cleared");
        require(block.timestamp > endsAt, "Giveaway has not ended");

        uint256 requestId = randomizer.request(50000);

        randomId = requestId;
    }

    function randomizerCallback(uint256 _id, bytes32 _value) external {
        require(_id == randomId, "Wrong requestId");
        require(msg.sender == address(randomizer), "Caller not Randomizer");
        require(winner == address(0), "Already drawn");

        uint256 winnerIndex = uint256(_value) % entrants.length;
        winner = entrants[winnerIndex];
    }

    function randomizerWithdraw(uint256 amount) external onlyOwner {
        randomizer.clientWithdrawTo(msg.sender, amount);
    }
}
