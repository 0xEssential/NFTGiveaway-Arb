# @nfight/signer

@nfight/signer offers an ethers-based `Signer` for implementing nFight's meta-transaction stack in your dapp.

## Features

Provide an `EssentialSigner` to an ethers `Contract` or wagmi contract hook and user transactions will seamlessly become meta-transactions.

- **Cross-chain NFT auth**: pass an NFT's `chainId`, `contractAddress` and `tokenId` to `Contract` calls - CCTG authorizes ownership and forwards this data to your L2 contract for building cross-chain experiences without bridging.

- **Network Agnostic UX**: `EssentialSigner` lets users sign meta-transactions with their Ethereum wallet from any network - no network switching or L2 gas tokens needed.

- **Burner Wallets**: nFight supports localized on-chain delegation for NFT auth. Pass a burner `Wallet` to `EssentialSigner` so users sign meta-transactions without a popup, while your L2 contract receives the primary address as the `_msgSender()`.

- **Simple Integration**: `EssentialSigner` is based on ethers, written in typescript and can be used in testing environments like hardhat.

## Installation

The package is available via NPM:

```bash
  yarn install @nfight/signer
```

## Usage

The SDK expects you to set some ENV vars in your dApp's environment:

### NFIGHT_CHAIN_ID

The chain ID value for the chain where your implementation contract lives. 0xEssential currently supports Polygon's Mumbai testnet (80001) and Matic mainnet (137).

### NFIGHT_RELAYER_URI

The SDK will handle submitting meta-transaction requests to your relayer. To do so the SDK needs to know the URI of the relaying service. This can be a fully qualified URL or a relative path.

nFight provides an OpenZeppelin Defender [autotask](../autotask/) that can be used as your relayer, but we recommend proxying the call to your autotask webhook to keep the URL secret.
