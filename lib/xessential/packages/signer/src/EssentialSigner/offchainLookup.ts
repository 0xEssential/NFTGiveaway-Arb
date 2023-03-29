import { Contract, ethers } from 'ethers';

import { abi } from '../abi/EssentialForwarder.js';

async function retrieveProof({
  url,
  callData,
  forwarder,
}: {
  url: string;
  callData: string;
  forwarder: {
    address: string;
    abi: any;
  };
}): Promise<string> {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'durin_call',
      params: { callData, to: forwarder.address, abi: forwarder.abi },
    }),
  });

  const body = await response.json();

  return body?.result;
}

export const handleOffchainLookup = async (
  args: {
    callData: string;
    callbackFunction: string;
    extraData: string;
    urls: string[];
  },
  forwarder: Contract,
): Promise<string> => {
  const { callData, callbackFunction, extraData, urls } = args;

  const abiCoder = new ethers.utils.AbiCoder();

  // hit OwnershipAPI for proof
  const proof = await retrieveProof({
    url: urls[0],
    callData,
    forwarder: { address: forwarder.address, abi },
  });

  return ethers.utils.hexConcat([
    callbackFunction,
    abiCoder.encode(['bytes', 'bytes'], [proof, extraData]),
  ]);

  // const tx = await forwarder.signer.sendTransaction({
  //   to: forwarder.address,
  //   data: __return_value___
  // });
};
