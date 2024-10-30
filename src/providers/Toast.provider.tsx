"use client";

import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
