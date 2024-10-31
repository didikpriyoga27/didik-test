/* eslint-disable @next/next/no-img-element */
"use client";

import TitleComponent from "@/components/atoms/Title";
import TypographyComponent from "@/components/atoms/Typography";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";

/**
 * A component that displays the user's ENS name and avatar, and the name of the connector
 * they are connected to, if they are connected to a Wagmi provider.
 *
 * @returns {ReactElement} A JSX element representing the Wagmi detail information.
 */
const WagmiDetailComponent = () => {
  const { isConnected } = useAccount();
  const { address, connector } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  if (!isConnected) {
    return null;
  }

  return (
    <div className="w-11/12 mx-auto mt-12 flex items-center justify-between">
      <div className="space-y-4 flex flex-col items-center justify-center w-full">
        <TitleComponent>Wagmi Connected</TitleComponent>
        {ensAvatar ? (
          <img
            alt="ENS Avatar"
            className="bg-green-500 rounded-full w-20 h-20"
            src={ensAvatar}
          />
        ) : (
          <div className="bg-green-500 rounded-full w-20 h-20" />
        )}
        {address && (
          <TypographyComponent>
            {ensName ? `${ensName} (${address})` : address}
          </TypographyComponent>
        )}
        <TypographyComponent>
          Connected to {connector?.name} Connector
        </TypographyComponent>
      </div>
    </div>
  );
};

export default WagmiDetailComponent;
