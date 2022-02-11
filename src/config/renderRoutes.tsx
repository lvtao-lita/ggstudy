import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const routerMap = (router) => {
  return router.map((item, i) => {
    if (item.router) {
      return (
        <Route key={item.key || i} path={item.path}>
          {routerMap(item.router)}
        </Route>
      );
    } else {
      return (
        <Route
          key={item.key || i}
          path={item.path}
          element={React.createElement(item.element)}
        ></Route>
      );
    }
  });
};
const RouteConfig = ({ router }) => {
  return (
    <BrowserRouter>
      <Routes>{routerMap(router)}</Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
