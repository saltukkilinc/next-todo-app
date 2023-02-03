import { Divider, NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col  bg-gradient-to-r from-[#85A1BA] to-[#194591]">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
