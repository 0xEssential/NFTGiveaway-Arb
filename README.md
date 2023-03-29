# NFT Giveaway

A Foundry project that uses 0xEssential's NFT Global Entry tooling to create an onchain raffle for holders of a specific NFT collection.

NFT Global Entry allows developers to deploy EVM contracts that can _token gate_ based on NFT ownership from other EVM chains. Instead of bridging, users submit a (Layer 2) transaction that includes a trusted _ownership proof_ from 0xEssential's ownership oracle.

You can use this repo as a simple example for how to implement NFT Global Entry. You can also clone the source code and adjust it to run your own raffle on any EVM chain 0xEssential supports.

Learn more about [NFT Global Entry in 0xEssential's docs](https://docs.0xessential.com).

## How it works

The `NFTGiveaway` contract as written offers an onchain raffle using Chainlink VRF for RNG used in winner selection. Entry to the raffle is restricted to holders of a specific NFT collection, specified with `nftChainId` and `nftContractAddress` values. Each token in the specified collection can enter once. Addresses can enter multiple times, once for each token they hold. If a holder enters the giveaway and sells their token, the seller remains in the raffle and the buyer cannot enter using their newly acquired NFT - 1 token, 1 entry.

The giveaway is open for 7 days from deploy. Once the raffle entry period ends, anyone can call a public function to clear the raffle. The deployed contract must be funded with $LINK in order to request a random number from Chainlink VRF.

The contract will select a random winning address from all entries and store the winner. `NFTGiveaway` does not handle reward distribution onchain. Instead, the assumption is that the giveaway admin will distribute rewards according to the onchain record.

## Gasless or Native Transactions

The `NFTGiveaway` contract and NFT Global Entry supports both gasless and native transactions. If you want to use gasless transactions, you'll need to set up a relaying service and fund it to pay for users' transactions.

For either gasless or native transactions, you must restrict the `enterGiveaway` function to only allow calls from an `EssentialForwarder`. Without this restriction, NFT ownership can be spoofed by anyone who calls the `enterGiveaway` function, allowing non-holders to enter your giveaway.

Implementing gasless transactions on your frontend is typically a bit more complicated than native transactions. 0xEssential's client SDK makes it easy to offer either. Our react package provides `usePrepareContractWrite` and `useContractWrite` hooks based on `wagmi` - install our package, change your import, and add a `txMode` argument of `'native'` or `'meta'`. Use whatever logic you want to determine which mode to use, or let your users choose.

## Fork It

If you want to deploy your own raffle, you can fork this repo and deploy your own `NFTGiveaway` contract. You'll need to set the `nftChainId` and `nftContractAddress` values to match the NFT collection you want to use for entry. You'll also need to fund the contract with $LINK to pay for Chainlink VRF requests.

The `env.example` file contains the environment variables needed in order to deploy the contract to the Avalanche Fuji testnet and C-chain mainnet. You can copy the file to `.env` and fill in the values for your desired chains.

For other networks, you can get the values for the Chainlink VRF contract addresses from [Chainlink's docs](https://docs.chain.link/vrf/v2/direct-funding/supported-networks#configurations). You'll also need API keys from the block explorer for the chain you deploy to in order to verify your deployed contract.

### Deploy Script

We're still trying to figure out the right way to use foundry deploy scripts with chain-specific environment variables. We're using `ALL_CAPS` network names in `foundry.toml` that correspond to ENV variables in `.env`.

When we deploy, we run the following command to set the `CHAIN` environment variable and then run the deploy script. This allows the script to use the correct network-specific values from `.env`.

```bash
CHAIN=FUJI forge script script/Deploy.s.sol
```

## Tests

This repo contains tests for the `NFTGiveaway` contract that mock NFT Global Entry tooling. The tests are written in Solidity and use the `forge-test` package. 

