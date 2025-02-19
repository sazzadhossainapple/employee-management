import React from "react";
import ScrollToTop from "../../hook/ScrollToTop";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default Main;
