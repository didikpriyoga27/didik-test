"use client";

import ButtonComponent from "@/components/atoms/Button";
import { useCallback } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

/**
 * A component that renders a button for connecting and disconnecting
 * a user's wallet to the app.
 *
 * When the button is clicked, it toggles between connecting the user's
 * wallet and disconnecting the user's wallet.
 *
 * @returns {ReactElement} A JSX element representing the component.
 */
const WagmiButtonComponent = () => {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleOnClick = useCallback(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    } else {
      disconnect();
    }
  }, [connect, connectors, disconnect, isConnected]);

  return (
    <ButtonComponent onClick={handleOnClick}>
      {isConnected ? "Disconnect" : "Web3 Integration with Wagmi"}
    </ButtonComponent>
  );
};

export default WagmiButtonComponent;
