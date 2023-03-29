import { Contract } from '@ethersproject/contracts';

import { BigNumber, BigNumberish, BytesLike } from 'ethers';

import {
  EssentialForwarder,
  IForwardRequest,
} from '../typechain/contracts/fwd/EssentialForwarder.js';

export interface ForwardRequestInput {
  to: string;
  from: string;
  authorizer: string;
  nftContract: string;
  nftChainId: BigNumberish;
  nftTokenId: BigNumberish;
  targetChainId: BigNumberish;
  data: BytesLike;
  nonce?: BigNumberish;
}

export async function getNonce(
  forwarder: Contract,
  from: string,
): Promise<BigNumber> {
  const nonce = await forwarder.getNonce(from);

  return nonce;
}


async function attachNonce(
  forwarder: Contract,
  input: Record<string, any>,
): Promise<IForwardRequest.ERC721ForwardRequestStruct> {
  const nonce = await getNonce(forwarder, input.from).then((nonce: BigNumber) => nonce.toString());

  return {
    value: BigNumber.from(0),
    gas: 1e6,
    to: input.to,
    from: input.from,
    authorizer: input.authorizer,
    nftContract: input.nftContract,
    nonce,
    nftChainId: input.nftChainId,
    nftTokenId: input.nftTokenId,
    targetChainId: input.targetChainId,
    data: input.data,
  };
}

export async function prepareRequest(
  input: ForwardRequestInput,
  forwarder: EssentialForwarder | Contract,
): Promise<{
  request: IForwardRequest.ERC721ForwardRequestStruct;
}> {

  const request = await attachNonce(forwarder, input);

  return {
    request
  };
}
