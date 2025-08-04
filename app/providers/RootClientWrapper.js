"use client";
import { Toaster } from "react-hot-toast";

export default function RootClientWrapper({ children }) {
  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
}
