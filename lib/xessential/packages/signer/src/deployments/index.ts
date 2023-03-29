import { ContractInterface } from 'ethers';

import { abi } from '../abi/EssentialForwarder.js';

const MUMBAI_ADDRESS = '0x9928351FD354D4E45416fc53e90457a428960cF4';
const MATIC_ADDRESS = '0x9bbb4217115B7296630183Bb23703DEC93E8edCf';

export interface EssentialForwarderDeployment {
  address: string;
  abi: ContractInterface;
}

export { abi };

export const EssentialForwarderDeployments: Record<
  string | number,
  EssentialForwarderDeployment
> = {
  matic: {
    address: MATIC_ADDRESS,
    abi,
  },
  mumbai: {
    address: MUMBAI_ADDRESS,
    abi,
  },
  137: {
    address: MATIC_ADDRESS,
    abi,
  },
  80001: {
    address: MUMBAI_ADDRESS,
    abi,
  },
};
