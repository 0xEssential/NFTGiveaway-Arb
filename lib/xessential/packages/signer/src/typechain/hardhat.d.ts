/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControl__factory>;
    getContractFactory(
      name: "ERC2771Context",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC2771Context__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "DelegationRegistry2771",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DelegationRegistry2771__factory>;
    getContractFactory(
      name: "EssentialEIP712",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EssentialEIP712__factory>;
    getContractFactory(
      name: "EssentialERC2771Context",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EssentialERC2771Context__factory>;
    getContractFactory(
      name: "EssentialERC2771ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EssentialERC2771ContextUpgradeable__factory>;
    getContractFactory(
      name: "EssentialForwarder",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EssentialForwarder__factory>;
    getContractFactory(
      name: "EssentialPlaySession",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EssentialPlaySession__factory>;
    getContractFactory(
      name: "IDelegationRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDelegationRegistry__factory>;
    getContractFactory(
      name: "SignedOwnershipProof",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SignedOwnershipProof__factory>;
    getContractFactory(
      name: "Counter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Counter__factory>;
    getContractFactory(
      name: "DelegationRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DelegationRegistry__factory>;

    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "AccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControl>;
    getContractAt(
      name: "IAccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControl>;
    getContractAt(
      name: "ERC2771Context",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC2771Context>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "DelegationRegistry2771",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DelegationRegistry2771>;
    getContractAt(
      name: "EssentialEIP712",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EssentialEIP712>;
    getContractAt(
      name: "EssentialERC2771Context",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EssentialERC2771Context>;
    getContractAt(
      name: "EssentialERC2771ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EssentialERC2771ContextUpgradeable>;
    getContractAt(
      name: "EssentialForwarder",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EssentialForwarder>;
    getContractAt(
      name: "EssentialPlaySession",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EssentialPlaySession>;
    getContractAt(
      name: "IDelegationRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDelegationRegistry>;
    getContractAt(
      name: "SignedOwnershipProof",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SignedOwnershipProof>;
    getContractAt(
      name: "Counter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Counter>;
    getContractAt(
      name: "DelegationRegistry",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DelegationRegistry>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}