import React from "react";
import Footer from "../components/Footer";
import Partners from "../components/Partners";

function Page({ children }) {
  return (
    <div>
      {children}
      <Partners/>
      <Footer />
    </div>
  );
}

export default Page;
