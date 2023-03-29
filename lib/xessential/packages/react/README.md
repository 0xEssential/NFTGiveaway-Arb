# @xessential/react

`@xessential/react` offers React-specific context and hooks for integrating 0xEssential dApp tooling.

Our hooks are modeled after `wagmi` making it easy for developers to add features like MultiChain Connections, Gasless Transactions, NFT Global Entry and Account Delegation. These features can be mixed and matched, depending on developer needs and user preferences.

The goal is to provide users a simple and safe experience without sacrificing decentralization. The tools are built on open-source standards for simple adoption and no vendor lock-in.

## Installation

The package is available via NPM:

```bash
  yarn add @xessential/react
```

## useDelegatedAccount

`useDelegatedAccount` is a replacement for `useAccount` that uses DelegateCash as an account delegation source. This helps users stay safe in a hot wallet with user context from their vault.

If a DelegateCash user is connected to a hot wallet in your dapp, you should still use their vault wallet address for things like ENS name and avatar, NFT holdings and token balances. Users can browse web3 safely with a hot wallet holding minimal assets while still reading the chain as if they were connected to their vault.

This hook does not affect how other wagmi hooks like `useContractWrite` behave. The signer for those hooks will always be the current connected address. Any transactions you submit depending on account delegation must perform an onchain check.  

### Usage

```tsx
import { useDelegatedAccount } from '@xessential/react'
import { useEnsName } from 'wagmi'

function App() {
  const {
    address, // `vaultAddress` || `signerAddress`
    isConnecting,
    isDisconnected,
    signerAddress,
    isDelegated,
    vaultAddresses,
    setVaultAddress,
  } = useDelegatedAccount();

  const {
    data: ensName,
    isError,
    isLoading,
  } = useEnsName({
    address, 
  });

  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <div>
      <p>Connected Address: {signerAddress}</p>
      {ensName && <p>Primary Ens: {ensName}</p>}
      {isDelegated && (
        <>
          <p>
            Vault Address: {address}
            {/* or `vaultAddress` */}
          </p>
          <p>Available Vault Addresses:</p>
          {vaultAddresses?.map((vault) => (
            <button key={vault} onClick={() => setVaultAddress(vault)}>
              {vault}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
```

### Return Value

```tsx
{
   /* 
    The primary address for _user context_. If the user is connected to a delegated wallet, this returns vaultAddress
  */
  address?: `0x${string}`;

  /** Gas token balance for connected address */
  connectedBalance?: FetchBalanceResult;

  /** Array of addresses to which the connected address has delegated authority */
  delegatedAddresses: `0x${string}`[];

  /** Convenience function for the connected address having 0 balance */
  isBurner: boolean;

  /** Boolean for whether connected address is delegate of a vaultAddress */
  isDelegated: boolean;

  /** Connected address used for transaction signing.  */
  signerAddress?: `0x${string}`;

  /** Connected address used for transaction signing.  */
  setVaultAddress: (address: `0x${string}`) => void;

  /*
    Current selected vault address. If connected address is delegate of > 1 vaults, 
    a best guess default is selected. See `setVaultAddress`.
  */
  vaultAddress?: `0x${string}`;

  /** Array of addresses that have delegated to connected address */
  vaultAddresses?: `0x${string}`[];

  /** Inherited from wagmi */
  connector?: Connector
  isConnecting: boolean
  isReconnecting: boolean
  isConnected: boolean
  isDisconnected: boolean
  status: 'connecting' | 'reconnecting' | 'connected' | 'disconnected'
}
```

### Configuration

#### type - optional

> The DelegateCash delegation type for vault context.

- `0`: `NONE`
- `1`: `ALL` (default)
- `2`: `CONTRACT`
- `3`: `TOKEN`

```tsx
 const {
    vaultAddress,
    signerAddress,
    isDelegated,
  } = useDelegatedAccount({
    chainId: 137,
  });
```

#### chainId - optional

> The chain ID for the DelegateCash delegation.

```tsx
 const {
    vaultAddress,
    signerAddress,
    isDelegated,
  } = useDelegatedAccount({
    chainId: 137,
  });
```

#### contractAddress - optional

> The contract address for the DelegateCash delegation when `type` is `CONTRACT` or `TOKEN`.

```tsx
 const {
    vaultAddress,
    signerAddress,
    isDelegated,
  } = useDelegatedAccount({
    contractAddress: NFT_CONTRACT,
    chainId: 137,
    type: DelegationType.CONTRACT
  });
```

#### tokenId - optional

> The tokenId for the DelegateCash delegation when `type` is `TOKEN`.

```tsx
 const {
    vaultAddress,
    signerAddress,
    isDelegated,
  } = useDelegatedAccount({
    contractAddress: NFT_CONTRACT,
    tokenId: 69,
    type: DelegationType.TOKEN
  });
```

#### onConnect - optional

> Inherited from wagmi

https://wagmi.sh/react/hooks/useAccount#onconnect-optional

#### onDisconnect - optional

> Inherited from wagmi

https://wagmi.sh/react/hooks/useAccount#ondisconnect-optional