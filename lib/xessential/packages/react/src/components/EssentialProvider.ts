import React, { createContext, ReactNode } from 'react';

import {
  address as forwarderAddress,
  domainName,
} from '../abis/GlobalEntryForwarder.js';

type EssentialReactConfig = {
  forwarderAddress?: string;
  domainName?: string;
  relayerUri: string;
  rpcUrl: string;
};

const defaultValue: EssentialReactConfig = {
  relayerUri: '',
  rpcUrl: '',
  domainName,
  forwarderAddress,
};

const EssentialContext = createContext<EssentialReactConfig>(defaultValue);

const EssentialProvider = ({
  config,
  children,
}: {
  config: EssentialReactConfig;
  children: ReactNode;
}): JSX.Element => {
  return React.createElement(EssentialContext.Provider, {
    children,
    value: { ...defaultValue, ...config },
  });
};

export { EssentialProvider, EssentialContext };
