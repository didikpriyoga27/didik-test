"use client";

import { PropsWithChildren } from "react";
import { WagmiProvider as RealWagmiProvider } from "wagmi";
import { config } from "./Wagmi.config";

/**
 * A React provider component that wraps the app with a Wagmi configuration.
 *
 * This component allows you to use hooks and components from the wagmi library
 * to interact with the Ethereum blockchain.
 *
 * @example
 * <WagmiProvider>
 *  <App />
 * </WagmiProvider>
 *
 * @param {PropsWithChildren} props - The props object, which contains a
 * `children` property that is the child component to be rendered.
 *
 * @returns {ReactElement} A JSX element representing the Wagmi provider.
 */
const WagmiProvider = ({ children }: PropsWithChildren) => {
  return <RealWagmiProvider config={config}>{children}</RealWagmiProvider>;
};

export default WagmiProvider;
